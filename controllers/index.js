const router = require('express').Router();

module.exports = (services, middleware) => {
  router.use(middleware.handlebars.sessionLocals);
  router.use(middleware.handlebars.appName);
  router.use('/user', require('./user')(services, middleware));
  router.use(middleware.errHandlers.controller.errPage);
  router.get('/', (req, res) => {
    return res.render('index');
  });

  return router;
};
