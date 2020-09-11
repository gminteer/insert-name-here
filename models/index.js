module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Profile = require('./profile')(sequelize);
  const Partnership = require('./partnership')(sequelize);

  User.hasOne(Profile);
  Profile.belongsTo(User);

  User.hasMany(Partnership, {foreignKey: 'primaryId', as: 'primary'});
  Partnership.belongsTo(User, {foreignKey: 'primaryId'});
  User.hasMany(Partnership, {foreignKey: 'secondaryId', as: 'secondary'});
  Partnership.belongsTo(User, {foreignKey: 'secondaryId'});
  return {User, Profile, Partnership};
};
