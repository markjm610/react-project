'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    profilePicture: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.belongsToMany(models.Project, {
      through: 'UsersProject',
      foreignKey: 'userId',
      otherKey: 'projectId'
    })
    User.hasMany(models.Task, { foreignKey: 'creatorId' })
  };
  return User;
};