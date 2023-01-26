'use strict';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [
      {
        groupId: 1,
        venueId: 1,
        name: 'Tennis Group First Meet and Greet',
        description: 'First meet and greet event for the evening tennis on the water group! Join us online for happy times!',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: new Date('2021-11-19 20:00:00'),
        endDate: new Date('2021-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'image url'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', {
      name: 'Tennis Group First Meet and Greet'
    });
  }
};
