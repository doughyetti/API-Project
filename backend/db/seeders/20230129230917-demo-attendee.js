'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Attendees';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        eventId: 1,
        status: 'attending'
      },
      {
        userId: 2,
        eventId: 1,
        status: 'waitlist'
      },
      {
        userId: 3,
        eventId: 1,
        status: 'pending'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Attendees';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1] }
    }, {});
  }
};
