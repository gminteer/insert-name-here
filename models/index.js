module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Profile = require('./profile')(sequelize);
  const PartnershipRatings = require('./partnershipratings')(sequelize);

  User.hasOne(Profile);
  Profile.belongsTo(User);

  return {User, Profile, PartnershipRatings};
};
