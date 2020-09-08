const router = require('express').Router();

module.exports = (services, middleware) => {
  router.use(middleware.handlebars.sessionLocals);
  router.use('/user', require('./user')(services, middleware));
  router.get('/', (req, res) => {
    return res.render('index');
  });

  return router;
};
