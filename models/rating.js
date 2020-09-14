const {Model, DataTypes} = require('sequelize');

class Rating extends Model {}

module.exports = (sequelize) =>
  Rating.init(
    {
      rating: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 0, max: 10}},
    },
    {
      sequelize,
      underscored: true,
      modelName: 'rating',
    }
  );
