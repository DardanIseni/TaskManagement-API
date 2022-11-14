const {Task , UserTask}  = require('../models/task_model');
const User = require('../models/user_model');



const getAllTasks= async (req, res) => {
    res.json(await Task.findAll( { include: {
            model: User,
            as : 'creator',
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
        },attributes: { exclude: ['UserId'] }}));
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, { include: {
            model: User,
            as : 'creator',
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            },attributes: { exclude: ['UserId'] }});
        if (task) {
            res.json(task);
        }
        else {
            res.status(404).json("Task not found");
        }
    }
    catch (err) {
        res.status(404).json("Task not found");
    }
}

const addTask = async (req, res) => {
    req.body.UserId = req.user.user_id ;
    const task = await Task.create(req.body);
    res.json(task);
}

const updateTask = async (req, res) => {
    if (req.params.id === undefined){
        res.status(400).json("Bad request");
    }
    await Task.update(req.body, { where: { id: req.params.id } });
    res.json(await Task.findByPk(req.params.id));

}

const deleteTask = async (req, res) => {
    try {
        res.json(await Task.destroy({ where: { id: req.params.id } }));
    }
    catch (err) {
        res.status(404).json("Task not found");
    }
}

const markTaskAsCompleted = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        const user = await User.findByPk(req.user.user_id ,{include: 'completed_tasks'});
        if (task) {
            task.status = true;
            await task.save();
            await UserTask.create({ UserId: user.id, TaskId: task.id },);
            res.json(task);
        }
        else {
            res.status(404).json("Task not found");
        }
    }
    catch (err) {
        res.status(404).json("Task not found");
    }
}

const getCompletedTasks = async (req, res) => {
    const doneTasks = await User.findOne({ where: { id: req.user.user_id }, include: {
        model: Task,
        as: 'completed_tasks',
            through: {
                attributes: []
            }
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    });
    res.json(doneTasks);
}


module.exports = {
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    addTask,
    markTaskAsCompleted,
    getCompletedTasks
}