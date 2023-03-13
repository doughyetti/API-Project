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
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        type: 'In Person',
        private: true,
        city: 'New York',
        state: 'NY',
        numMembers: 10,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1677636204/meetup%20shit/31virus-tennis02-mobileMasterAt3x-v2_h8qv6x.jpg'
      },
      {
        organizerId: 2,
        name: 'Ball w the boisss',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        type: 'In Person',
        private: true,
        city: 'New York',
        state: 'NY',
        numMembers: 10,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1677978779/meetup%20shit/funny-basketball-picture_zw1e7t.jpg'
      },
      {
        organizerId: 3,
        name: 'Climbing w the crew',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        type: 'In Person',
        private: true,
        city: 'New York',
        state: 'NY',
        numMembers: 10,
        previewImage: 'https://res.cloudinary.com/dcbexnl8j/image/upload/v1677636587/meetup%20shit/adam-ondra-9c-pavel-blazek_s_vez0hh.jpg'
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
