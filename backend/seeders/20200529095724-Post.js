'use strict';

module.exports = {
  up: async (queryInterface) => {
    const impacters = await queryInterface.sequelize
      .query('SELECT id, "title" FROM "Impacters"', {raw: true});
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'Title 1',
          imagePath: 'https://images.milkywire.com/public/milkywire-logo-scribbled.png',
          content: 'Welcome to a new way to make an impact. ',
          impacterId: impacters && impacters[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Title 2',
          imagePath: 'https://lh3.googleusercontent.com/ujdD_ai5XEjxPakmUSWU3kfYjjgePqRUuFAgI0UCCel93lHLy4r8GDmLhp6ds2CEjg',
          content: 'Welcome to a new way to make an impact. 2',
          impacterId: impacters && impacters[0][1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
  },
  down: (queryInterface) => queryInterface.bulkDelete('Posts', null, {}),
};
