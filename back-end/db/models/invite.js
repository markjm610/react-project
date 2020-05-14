'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('Invite', {
    inviteSender: DataTypes.STRING,
    inviteReceiver: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  Invite.associate = function (models) {
    Invite.belongsTo(models.Project, { foreignKey: 'projectId' })
    Invite.belongsTo(models.User, { foreignKey: 'inviteSender' })
    Invite.belongsTo(models.User, { foreignKey: 'inviteReceiver' })
  };
  return Invite;
};