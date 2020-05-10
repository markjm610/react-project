'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    heading: DataTypes.STRING,
    description: DataTypes.TEXT,
    creatorId: DataTypes.INTEGER,
    columnId: DataTypes.INTEGER,
    rowId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};