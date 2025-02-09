const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employees = require('./employee');
const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  codigo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  resumen: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  id_employee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employees,
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }

}, {
  tableName: 'applications',
  timestamps: false
})

Application.belongsTo(Employees, { foreignKey: 'id_employee', as: 'employee' });
Employees.hasMany(Application, { foreignKey: 'id_employee', as: 'applications' });



module.exports = Application;