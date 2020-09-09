module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Profile = require('./profile')(sequelize);

  User.hasOne(Profile);
  Profile.belongsTo(User);

  return {User, Profile};
};
