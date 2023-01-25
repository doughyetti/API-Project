'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventsImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      eventsImage.belongsTo(models.Event, { foreignKey: 'eventId' });
    }
  }
  eventsImage.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'eventsImage',
  });
  return eventsImage;
};
