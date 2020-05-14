'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UsersProjects', [
      {
        userId: 1,
        projectId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        projectId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        projectId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        projectId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        projectId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        projectId: 5,
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
      
    */
    return queryInterface.bulkDelete('UsersProjects', null, {});
  }
};
