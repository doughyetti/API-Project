'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'groupsImages';
    await queryInterface.bulkInsert(options, [
      {
        "id": 1,
        "groupId": 1,
        "url": "image url",
        "preview": true
      },
      {
        "id": 2,
        "groupId": 1,
        "url": "image url",
        "preview": false
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'groupsImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2] }
    }, {});
  }
};
