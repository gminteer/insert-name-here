const {Model, DataTypes} = require('sequelize');

class SkillRank extends Model {}

module.exports = (sequelize) =>
  SkillRank.init(
    {
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 10,
        },
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'skillrank',
    }
  );
