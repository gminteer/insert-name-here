const {Model, DataTypes} = require('sequelize');

class skillRanks extends Model {}

module.exports = (sequelize) => {
  skillRanks.init(
    {
      // skill: {},
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 10,
        },
      },
      skillsetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'skillranks',
    }
  );
};
