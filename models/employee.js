const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employees = sequelize.define('Employees', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  salario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'employees',
  timestamps: false
});


module.exports = Employees;
