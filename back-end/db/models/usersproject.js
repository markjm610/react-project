'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersProject = sequelize.define('UsersProject', {
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    position: DataTypes.INTEGER
  }, {});
  UsersProject.associate = function (models) {
    // associations can be defined here
  };
  return UsersProject;
};