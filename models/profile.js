const {Model, DataTypes} = require('sequelize');

class Profile extends Model {}

module.exports = (sequelize) =>
  Profile.init(
    {
      github: {type: DataTypes.STRING},
      linkedIn: {type: DataTypes.STRING},
      picture: {type: DataTypes.STRING, validate: {isUrl: true}},
      profile: {type: DataTypes.STRING, validate: {isUrl: true}},
      resume: {type: DataTypes.STRING, validate: {isUrl: true}},
    },
    {
      sequelize,
      modelName: 'profile',
      underscored: true,
    }
  );
