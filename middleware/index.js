module.exports = (services) => ({
  auth: require('./auth')(services),
  validation: require('./validation')(services),
  handlebars: require('./handlebars')(services),
  errHandlers: require('./err-handlers')(services),
});
