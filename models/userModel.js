const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false, 
});

module.exports = User;
