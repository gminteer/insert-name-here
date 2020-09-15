module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Profile = require('./profile')(sequelize);
  const Partnership = require('./partnership')(sequelize);
  const Rating = require('./rating')(sequelize);
  // const PartnershipRatings = require('./partnershipratings')(sequelize);
  // const Parternships = require('./partnerships')(sequelize);
  const Skillranks = require('./skillranks')(sequelize);
  const Skillsets = require('./skillsets')(sequelize);

  User.hasOne(Profile);
  Profile.belongsTo(User);

  User.hasMany(Partnership, {foreignKey: 'primaryId', as: 'primary'});
  Partnership.belongsTo(User, {foreignKey: 'primaryId'});
  User.hasMany(Partnership, {foreignKey: 'secondaryId', as: 'secondary'});
  Partnership.belongsTo(User, {foreignKey: 'secondaryId'});

  Rating.belongsTo(Partnership);
  Partnership.hasMany(Rating);

  Rating.belongsTo(User, {foreignKey: 'ownerId'});
  User.hasMany(Rating, {foreignKey: 'ownerId', as: 'owner'});
  Rating.belongsTo(User, {foreignKey: 'targetId'});
  User.hasMany(Rating, {foreignKey: 'targetId', as: 'target'});

  // return {User, Profile, Partnership, Rating};
  return {User, Profile, Rating, Partnership, Skillranks, Skillsets};
};
