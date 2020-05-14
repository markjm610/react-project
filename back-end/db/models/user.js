'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
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
    User.hasMany(models.Invite, { foreignKey: 'inviteSender' })
    User.hasMany(models.Invite, { foreignKey: 'inviteReceiver' })
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};