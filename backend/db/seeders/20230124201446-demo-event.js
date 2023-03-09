'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        venueId: 1,
        name: 'Tennis Group First Meet and Greet',
        description: 'First meet and greet event for the evening tennis on the water group! Join us online for happy times!',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: ('2021-11-19 20:00:00'),
        endDate: ('2021-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1678387200/meetup%20shit/b5ec9f9b-3082-4f2a-8956-f97a72e41bbc-Tennis_Finals_0529_84_gpefqq.webp'
      },
      {
        groupId: 1,
        venueId: 1,
        name: 'Tennis Group First Meet and Greet',
        description: 'First meet and greet event for the evening tennis on the water group! Join us online for happy times!',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: new Date('2024-11-19 20:00:00'),
        endDate: new Date('2024-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1678387200/meetup%20shit/b5ec9f9b-3082-4f2a-8956-f97a72e41bbc-Tennis_Finals_0529_84_gpefqq.webp'
      },
      {
        groupId: 2,
        venueId: 2,
        name: 'Ball w the boisss',
        description: 'First meet and greet event for the evening bball on the water group! Join us online for happy times!',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: new Date('2021-11-19 20:00:00'),
        endDate: new Date('2021-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1678387253/meetup%20shit/GettyImages-91956148.0_xntxrh.jpg'
      },
      {
        groupId: 2,
        venueId: 2,
        name: 'Ball w the boisss',
        description: 'First meet and greet event for the evening bball on the water group! Join us online for happy times!',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: new Date('2024-11-19 20:00:00'),
        endDate: new Date('2024-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1678387253/meetup%20shit/GettyImages-91956148.0_xntxrh.jpg'
      },
      {
        groupId: 3,
        venueId: 3,
        name: 'Climbing w the crew',
        description: 'First meet and greet event for the evening bouldering on the water group! Join us online for happy times!',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: new Date('2021-11-19 20:00:00'),
        endDate: new Date('2021-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1678387332/meetup%20shit/bipoc_bouldering_20211108_025_ze_0_m6f7mx.jpg'
      },
      {
        groupId: 3,
        venueId: 3,
        name: 'Climbing w the crew',
        description: 'First meet and greet event for the evening bouldering on the water group! Join us online for happy times!',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: new Date('2024-11-19 20:00:00'),
        endDate: new Date('2024-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1678387332/meetup%20shit/bipoc_bouldering_20211108_025_ze_0_m6f7mx.jpg'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.bulkDelete(options, {
      name: ['Tennis Group First Meet and Greet', 'Ball w the boisss', 'Climbing w the crew']
    }, {});
  }
};
