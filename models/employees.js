'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Employee extends Model {
    static associate(models) {
      // Aquí puedes definir relaciones con otras tablas si es necesario
    }
  }

  Employee.init(
    {
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
    },
    {
      sequelize,
      modelName: 'Employee',
      tableName: 'Employees',
      timestamps: false
    }
  );

  return Employee;
};
