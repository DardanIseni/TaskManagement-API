const {  DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user_model');

const Task = sequelize.define('Task', {
    // attributes
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

}, {

// Other model options go here
});

const UserTask = sequelize.define('UserTask', {
    TaskId: {
        type: DataTypes.INTEGER,
        references: {
            model: Task,
            key: 'id'
        }
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

Task.belongsTo(User,{
    foreignKey: "UserId",
    as: "creator",
});
User.hasMany(Task, {
    as : 'created_tasks'
});

Task.belongsToMany(User, {as:'completed_from', through: 'UserTask'});
User.belongsToMany(Task, {as:'completed_tasks', through: 'UserTask' });


module.exports = {Task, UserTask};
