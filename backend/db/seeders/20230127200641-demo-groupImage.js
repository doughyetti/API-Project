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
        groupId: 1,
        url: "image url",
        preview: true
      },
      {
        groupId: 1,
        url: "image url",
        preview: false
      },
      {
        groupId: 1,
        url: "image url",
        preview: false
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'groupsImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1] }
    }, {});
  }
};
