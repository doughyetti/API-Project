'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    await queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: 'Evening Tennis on the Water',
        about: 'Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.',
        type: 'In Person',
        private: true,
        city: 'New York',
        state: 'NY',
        numMembers: 10,
        previewImage: 'image url'
      },
      {
        organizerId: 1,
        name: 'Ball w the boisss',
        about: 'Enjoy rounds of bball with a tight-nit group of people on the water facing the Brooklyn Bridge. 1v1s and 5v5s.',
        type: 'In Person',
        private: true,
        city: 'New York',
        state: 'NY',
        numMembers: 10,
        previewImage: 'image url'
      },
      {
        organizerId: 1,
        name: 'Climbing w the crew',
        about: 'Enjoy bouldering with a tight-nit group of people on the water facing the Brooklyn Bridge. dynos only brah.',
        type: 'In Person',
        private: true,
        city: 'New York',
        state: 'NY',
        numMembers: 10,
        previewImage: 'image url'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    await queryInterface.bulkDelete(options, {
      name: ['Evening Tennis on the Water', 'Ball w the boisss', 'Climbing w the crew']
    }, {});
  }
};
