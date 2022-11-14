const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://develop:2612@localhost:5432/node-tutorial');

module.exports = sequelize;
