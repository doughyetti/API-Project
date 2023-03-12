'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendee.belongsTo(models.User, { foreignKey: 'userId', as: 'Attendance', onDelete: 'CASCADE' });
      Attendee.belongsTo(models.Event, { foreignKey: 'eventId', onDelete: 'CASCADE' });
    }
  }
  Attendee.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['attending', 'waitlist', 'pending'],
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
