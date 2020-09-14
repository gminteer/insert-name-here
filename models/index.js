module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Profile = require('./profile')(sequelize);
  const Partnership = require('./partnership')(sequelize);
  const Rating = require('./rating')(sequelize);

  User.hasOne(Profile);
  Profile.belongsTo(User);

  User.hasMany(Partnership, {foreignKey: 'primaryId', as: 'primary'});
  Partnership.belongsTo(User, {foreignKey: 'primaryId'});
  User.hasMany(Partnership, {foreignKey: 'secondaryId', as: 'secondary'});
  Partnership.belongsTo(User, {foreignKey: 'secondaryId'});

  Rating.belongsTo(Partnership);
  Partnership.hasMany(Rating);

  Rating.belongsTo(User, {foreignKey: 'ownerId', as: 'owner'});
  User.hasMany(Rating, {foreignKey: 'ownerId'});
  Rating.belongsTo(User, {foreignKey: 'targetId', as: 'target'});
  User.hasMany(Rating, {foreignKey: 'targetId'});

  return {User, Profile, Partnership, Rating};
};
