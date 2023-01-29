'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: '123 Disney Lane',
        city: 'New York',
        state: 'NY',
        lat: 37.7645358,
        lng: -122.4730327
      },
      {
        groupId: 1,
        address: '234 Marvel Lane',
        city: 'Austin',
        state: 'TX',
        lat: 37.7645358,
        lng: -122.4730327
      },
      {
        groupId: 1,
        address: '456 DC Lane',
        city: 'LA',
        state: 'CA',
        lat: 37.7645358,
        lng: -122.4730327
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    await queryInterface.bulkDelete(options, {
      address: ['123 Disney Lane', '234 Marvel Lane', '456 DC Lane']
    }, {});
  }
};
