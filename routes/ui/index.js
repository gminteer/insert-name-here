const router = require('express').Router();

module.exports = (services, {handlebars}) => {
  router.use(handlebars.sessionLocals);
  router.get('/', (req, res) => {
    return res.render('index');
  });

  return router;
};
