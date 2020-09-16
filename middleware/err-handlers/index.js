module.exports = (services) => ({
  api: require('./api')(services),
  controller: require('./controller')(services),
});
