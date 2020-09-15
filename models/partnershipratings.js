const {Model, Datatypes} = require('sequelize');

class PartnershipRatings extends Model {}

module.exports = (sequelize) => {
  PartnershipRatings.init({
    id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: Datatypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
    targetId: {},
    partnershipId: {},

    sequelize,
    underscored: true,
    modelName: 'partnershipratings',
  });
};

module.exports = PartnershipRatings;
