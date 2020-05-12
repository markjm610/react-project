'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Projects', [
      {
        name: 'Seed Project One',
        creatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Seed Project Two',
        creatorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Seed Project Three',
        creatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
