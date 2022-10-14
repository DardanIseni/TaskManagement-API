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

Task.belongsTo(User,{
    foreignKey: "UserId",
    as: "User",
});
User.hasMany(Task);



module.exports = Task;
