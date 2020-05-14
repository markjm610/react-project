'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {


    return queryInterface.bulkInsert('Columns', [
      {
        name: 'Seed Column One',
        pagePosition: 0,
        projectId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Seed Column Two',
        pagePosition: 1,
        projectId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Seed Column Three',
        pagePosition: 2,
        projectId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Seed Column Four',
        pagePosition: 0,
        projectId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Seed Column Five',
        pagePosition: 1,
        projectId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Seed Column Six',
        pagePosition: 0,
        projectId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },


  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Columns', null, {});
  }
};
