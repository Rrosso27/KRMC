const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize); 

const db = {
    User,
    sequelize,
    Sequelize
};

module.exports = db;
