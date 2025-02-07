'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Aquí puedes definir relaciones con otras tablas si es necesario
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      rol: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: false 
    }
  );

  return User;
};
