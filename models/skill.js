const {Model, DataTypes} = require('sequelize');

class Skill extends Model {}

module.exports = (sequelize) =>
  Skill.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      modelName: 'skill',
    }
  );
