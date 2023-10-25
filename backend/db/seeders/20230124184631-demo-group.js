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
        about: "Playing tennis with friends can be a fun and enjoyable way to spend time together while staying active. Whether you're playing singles or doubles, tennis with friends offers a perfect blend of physical activity, social interaction, and enjoyment, making it a popular choice for leisure and recreation.",
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
        about: "Playing basketball with friends is a fantastic way to have fun, stay active, and enjoy the spirit of friendly competition. Whether you're playing a pickup game at a local park, shooting hoops in your driveway, or participating in a more organized league, playing basketball with friends offers a myriad of physical, social, and emotional benefits, making it a popular and enjoyable activity for people of all ages.",
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
        about: "Rock climbing with friends is an exhilarating and social activity that offers a unique blend of physical challenge, mental focus, and camaraderie. Whether climbing outdoors on natural rock formations or indoors at a climbing gym, rock climbing with friends offers a unique opportunity for personal growth, physical fitness, and building strong social connections.",
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
