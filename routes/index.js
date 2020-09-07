const router = require('express').Router();

module.exports = (services, middleware) => {
  router.use('/api/v1', require('./api')(services, middleware));
  return router;
};
