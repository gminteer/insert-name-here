const {Model, DataTypes} = require('sequelize');

class Profile extends Model {}

module.exports = (sequelize) =>
  Profile.init(
    {
      github: {type: DataTypes.STRING},
      linkedIn: {type: DataTypes.STRING},
      picture: {type: DataTypes.STRING, validate: {isUrl: true}},
      portfolio: {type: DataTypes.STRING, validate: {isUrl: true}},
      resume: {type: DataTypes.STRING, validate: {isUrl: true}},
      website: {type: DataTypes.STRING, validate: {isUrl: true}},
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'profile',
      underscored: true,
    }
  );
