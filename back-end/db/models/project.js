'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    creatorId: DataTypes.INTEGER
  }, {});
  Project.associate = function (models) {
    Project.hasMany(models.Column, { foreignKey: 'projectId' })
    Project.belongsToMany(models.User, {
      through: 'UsersProject',
      foreignKey: 'projectId',
      otherKey: 'userId'
    })
    Project.hasMany(models.Invite, { foreignKey: 'projectId' })
  };
  return Project;
};