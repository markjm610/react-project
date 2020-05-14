'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('Invite', {
    inviteSender: DataTypes.INTEGER,
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