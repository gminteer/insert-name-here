module.exports = (sequelize, models) => ({
  user: require('./user')(sequelize, models),
  profile: require('./profile')(sequelize, models),
  partnership: require('./partnership')(sequelize, models),
  skillset: require('./skillset')(sequelize, models),
});
