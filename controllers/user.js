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
    const {user_id: userId} = req.params;
    const user = await services.user.get(userId);
    if (!user) return res.sendStatus(404);
    const profile = await services.profile.get(userId);
    return res.render('user/view_profile', {user, profile});
  });
  router.get('/profile/:user_id/edit', async (req, res) => {
    const {user_id: userId} = req.params;
    if (req.session.user.id !== Number(userId)) return res.redirect('./');
    const user = await services.user.get(userId);
    if (!user) return res.sendStatus(404);
    const profile = await services.profile.get(userId);
    return res.render('user/edit_profile', {user, profile});
  });
  router.get('/profile/:user_id/messages', async (req, res) => {
    const {user_id: userId} = req.params;
    if (req.session.user.id !== Number(userId)) return res.redirect('./');
    const user = await services.user.get(userId);
    if (!user) return res.sendStatus(404);
    const messages = await services.get
    return res.render('user/message_screen', {user, messages});
  });
  return router;
  
};
