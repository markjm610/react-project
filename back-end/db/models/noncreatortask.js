'use strict';
module.exports = (sequelize, DataTypes) => {
  const NonCreatorTask = sequelize.define('NonCreatorTask', {
    nonCreatorId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {});
  NonCreatorTask.associate = function(models) {
    // associations can be defined here
  };
  return NonCreatorTask;
};