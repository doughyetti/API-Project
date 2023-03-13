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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: new Date('2024-11-19 20:00:00'),
        endDate: new Date('2024-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1678433356/meetup%20shit/020523_IowaWomensTennisVKansasSt_CB14-900x600_ado0sd.jpg'
      },
      {
        groupId: 2,
        venueId: 2,
        name: 'Ball w the boisss',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: new Date('2024-11-19 20:00:00'),
        endDate: new Date('2024-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1678433469/meetup%20shit/featured-street-basketball-NYC-untapped-cities1_omdp3r.jpg'
      },
      {
        groupId: 3,
        venueId: 3,
        name: 'Climbing w the crew',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: new Date('2024-11-19 20:00:00'),
        endDate: new Date('2024-11-19 22:00:00'),
        numAttending: 8,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1678387342/meetup%20shit/buffs_on_the_roam_1_xa7ebi.webp'
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
