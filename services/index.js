module.exports = (sequelize, models) => ({
  user: require('./user')(sequelize, models),
  profile: require('./profile')(sequelize, models),
});
