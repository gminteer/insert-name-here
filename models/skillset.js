const {Model} = require('sequelize');

class SkillSet extends Model {}

module.exports = (sequelize) =>
  SkillSet.init(
    {},
    {
      sequelize,
      underscored: true,
      modelName: 'skillset',
    }
  );
