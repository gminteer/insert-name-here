module.exports = (sequelize) => ({
  User: require('./user')(sequelize),
});
