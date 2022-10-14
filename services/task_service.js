const Task  = require('../models/task_model');

const getAllTasks= async (req, res) => {
    res.json(await Task.findAll());
}

const getTaskById = async (req, res) => {

    try {
        const task = await Task.findByPk(req.params.id);
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


module.exports = {
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    addTask
}