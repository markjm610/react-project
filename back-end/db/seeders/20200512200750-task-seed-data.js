'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        heading: 'Seed Task One',
        description: 'This is task one. This description is short.',
        creatorId: 1,
        columnId: 1,
        columnPosition: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        heading: 'Seed Task Two',
        description: 'This is task two. This description is medium. This is task one. This description is medium. This is task one. This description is medium. This is task one. This description is medium. This is task one. This description is medium. This is task one. This description is medium. ',
        creatorId: 1,
        columnId: 1,
        columnPosition: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        heading: 'Seed Task Three',
        description: 'This is task three. This description is short.',
        creatorId: 2,
        columnId: 1,
        columnPosition: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        heading: 'Seed Task Four',
        description: 'This is task four. This description is long. This is task four. This description is long. This is task four. This description is long. This is task four. This description is long. This is task four. This description is long. This is task four. This description is long. This is task four. This description is long. This is task four. This description is long. This is task four. This description is long. ',
        creatorId: 2,
        columnId: 2,
        columnPosition: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        heading: 'Seed Task Five',
        description: 'This is task five. This description is short.',
        creatorId: 1,
        columnId: 2,
        columnPosition: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        heading: 'Seed Task Six',
        description: 'This is task six. This description is medium. This is task six. This description is medium. This is task six. This description is medium. This is task six. This description is medium.',
        creatorId: 1,
        columnId: 3,
        columnPosition: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        heading: 'Seed Task Seven',
        description: 'This is task seven. This description is short.',
        creatorId: 2,
        columnId: 3,
        columnPosition: 1,
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
  }
};
