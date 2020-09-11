const {Model, DataTypes} = require('sequelize');

class Partnerships extends Model {}

module.exports = (sequelize) => {
  Partnerships.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {},
    sequelize,
    modelName: 'partnerships',
  });
};


