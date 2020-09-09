const router = require('express').Router();

module.exports = (services) => {
  router.get('/login', (req, res) => {
    return res.render('user/login_signup', {login: true});
  });
  router.get('/signup', (req, res) => {
    return res.render('user/login_signup', {login: false});
  });
  router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
  });
  router.get('/profile/:user_id', async (req, res) => {
    const user = await services.user.get(req.params.user_id);
    if (!user) return res.sendStatus(404);
    return res.render('user/profile', user);
  });

  return router;
};
