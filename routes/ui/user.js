const router = require('express').Router();

module.exports = (services, middleware) => {
  router.get('/profile/:user_id', async (req, res) => {
    const user = await services.user.get(req.params.user_id);
    if (!user) return res.sendStatus(404);
    return res.render('profile', user);
  });

  return router;
};
