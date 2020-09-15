module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Profile = require('./profile')(sequelize);
  const PartnershipRatings = require('./partnershipratings')(sequelize);
  const Parternships = require('./partnerships')(sequelize);
  const Skillranks = require('./skillranks')(sequelize);
  const Skillsets = require('./skillsets')(sequelize);

  User.hasOne(Profile);
  Profile.belongsTo(User);

  return {User, Profile, PartnershipRatings, Parternships, Skillranks, Skillsets};
};
