'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    heading: DataTypes.STRING,
    description: DataTypes.TEXT,
    creatorId: DataTypes.INTEGER,
    columnId: DataTypes.INTEGER,
    columnPosition: DataTypes.INTEGER
  }, {});
  Task.associate = function (models) {
    Task.belongsTo(models.User, { foreignKey: 'creatorId' })
    Task.belongsTo(models.Column, { foreignKey: 'columnId' })
  };
  return Task;
};