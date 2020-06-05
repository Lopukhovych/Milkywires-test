'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Impacters',
      [
        {
          title: 'Impacter 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Impacter 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
  },

  down: (queryInterface) => queryInterface.bulkDelete('Impacters', null, {}),
};
