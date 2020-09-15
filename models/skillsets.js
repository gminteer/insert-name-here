const {Model, DataTypes} = require('sequelize');

class skillsets extends Model {}

module.exports = (sequelize) => {
  skillsets.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'skillranks',
    }
  );
};
