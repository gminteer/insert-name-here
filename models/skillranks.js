const {Model, DataType} = require('sequelize');

class skillRanks extends Model {}

module.exports = (sequelize) => {
  skillRanks.init({
    skill: {},
    rank: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
    skillsetId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    sequelize,
    modelName: 'skillranks',
  });
};
