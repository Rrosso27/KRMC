const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize);
const Employee = require('./employee')
const Application = require('./application');


const db = {
    User,
    Application,
    Employee,
    sequelize,
    Sequelize
};

module.exports = db;
