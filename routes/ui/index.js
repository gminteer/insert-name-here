const router = require('express').Router();

module.exports = (services, middleware) => {
  router.get('/', (req, res) => {
    return res.render('index');
  });

  return router;
};
