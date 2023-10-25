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
        description: "Casual tennis offers a wonderful way for people to enjoy the sport in a relaxed and social setting. It's a perfect way to unwind, stay active, and spend quality time with friends and family while appreciating the thrill of the game.",
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
        description: "Casual tennis offers a wonderful way for people to enjoy the sport in a relaxed and social setting. It's a perfect way to unwind, stay active, and spend quality time with friends and family while appreciating the thrill of the game.",
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
        description: "Overall, casual basketball offers a relaxed and enjoyable way for individuals to participate in the sport, fostering a sense of community, friendship, and well-being. It's a popular recreational activity that allows people to unwind, have fun, and stay active in an informal and social setting.",
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
        description: "Overall, casual basketball offers a relaxed and enjoyable way for individuals to participate in the sport, fostering a sense of community, friendship, and well-being. It's a popular recreational activity that allows people to unwind, have fun, and stay active in an informal and social setting.",
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
        description: "Casual rock climbing offers a wonderful way for individuals and groups to engage in physical activity, enjoy the thrill of climbing, and build friendships within a supportive community. It's a popular recreational activity that promotes fitness, mental focus, and a sense of accomplishment in a relaxed and enjoyable setting.",
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
        description: "Casual rock climbing offers a wonderful way for individuals and groups to engage in physical activity, enjoy the thrill of climbing, and build friendships within a supportive community. It's a popular recreational activity that promotes fitness, mental focus, and a sense of accomplishment in a relaxed and enjoyable setting.",
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
