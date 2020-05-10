'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    creatorId: DataTypes.INTEGER
  }, {});
  Project.associate = function (models) {

  };
  return Project;
};