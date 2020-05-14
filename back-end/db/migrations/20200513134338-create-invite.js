'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inviteSender: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
        allowNull: false
      },
      inviteReceiver: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
        allowNull: false
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects' },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Invites');
  }
};