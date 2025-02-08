const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize); 
const Employee = require('./employees')(sequelize)

const db = {
    User,
    Employee,
    sequelize,
    Sequelize
};

module.exports = db;
