const router = require('express').Router();
module.exports = (services, middleware, handleErr) => {
  router.use('/', require('./account')(services, middleware, handleErr));
  router.use('/profile', require('./profile')(services, middleware, handleErr));
  router.use('/messages', require('./messages')(services, middleware, handleErr));

  return router;
};
