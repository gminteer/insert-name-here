module.exports = (sequelize, models) => ({
  user: require('./user')(sequelize, models),
});
