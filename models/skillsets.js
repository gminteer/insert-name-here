const {Model, DataType} = require('sequelize');

class skillsets extends Model {}

module.exports = (sequelize) => {
  skillsets.init({
    id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    sequelize,
    modelName: 'skillranks',
  });
};
