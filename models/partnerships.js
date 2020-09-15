const {Model, DataType} = require('sequelize');

class Partnerships extends Model {}

module.exports = (sequelize) => {
  Partnerships.init({
    id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    status: {
        
    },
    sequelize,
    modelName: 'partnerships',
  });
};


