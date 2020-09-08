const router = require('express').Router();

module.exports = (services, middleware) => {
  router.use('/api/v1', require('./api')(services, middleware));
  router.use('/', require('./ui')(services, middleware));
  return router;
};
