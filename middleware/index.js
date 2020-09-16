module.exports = (services) => ({
  auth: require('./auth')(services),
  handlebars: require('./handlebars')(services),
  errHandlers: require('./err-handlers')(services),
});
