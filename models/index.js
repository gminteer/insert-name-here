module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Profile = require('./profile')(sequelize);
  const PartnershipRatings = require('./partnershipratings')(sequelize);
  const Parternships = require('./partnerships')(sequelize);
  const Skillranks = require('./skillranks')(sequelize);
  const Skillsets = require('./skillsets')(sequelize);

  User.hasOne(Profile);
  Profile.belongsTo(User);
  User.hasMany(Parternships);
  Parternships.belongsTo(User);
  User.hasMany(PartnershipRatings);
  PartnershipRatings.belongsTo(User);
  PartnershipRatings.belongsTo(Parternships);
  Parternships.hasMany(PartnershipRatings);
  User.hasMany(Skillsets);
  Skillsets.belongsTo(User);
  Skillsets.hasMany(Skillranks);
  Skillranks.belongsTo(Skillsets);

  return {User, Profile, PartnershipRatings, Parternships, Skillranks, Skillsets};
};
