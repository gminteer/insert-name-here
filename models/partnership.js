const {Model, DataTypes} = require('sequelize');

class Partnership extends Model {
  static get STATUS() {
    return ['MATCHED', 'ACTIVE', 'CLOSED', 'BLOCKED'];
  }
}

module.exports = (sequelize) =>
  Partnership.init(
    {
      status: DataTypes.ENUM(Partnership.STATUS),
      primaryId: {type: DataTypes.INTEGER, references: {model: 'users', key: 'id'}},
      secondaryId: {type: DataTypes.INTEGER, references: {model: 'users', key: 'id'}},
    },
    {
      sequelize,
      modelName: 'partnership',
      underscored: true,
    }
  );
