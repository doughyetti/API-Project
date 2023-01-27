'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupsImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      groupsImage.belongsTo(models.Group, { foreignKey: 'groupId', as: 'GroupImages' });
    }
  }
  groupsImage.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING
    },
    preview: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName: 'groupsImage',
  });
  return groupsImage;
};
