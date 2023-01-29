'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'eventsImages';
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: "image url",
        preview: true
      },
      {
        eventId: 1,
        url: "image url",
        preview: false
      },
      {
        eventId: 1,
        url: "image url",
        preview: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'eventsImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1] }
    }, {});
  }
};
