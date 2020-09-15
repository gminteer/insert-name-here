const router = require('express').Router();

module.exports = (services, {auth}) => {
  // login page
  router.get('/login', (req, res) => {
    return res.render('user/login_signup', {login: true});
  });
  // signup page
  router.get('/signup', (req, res) => {
    return res.render('user/login_signup', {login: false});
  });
  // logout (redirect to home)
  router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
  });
  // change the currently logged in user's profile
  router.get('/profile/edit', auth.mustBeLoggedIn, async (req, res) => {
    const profile = await services.profile.get(req.session.user.id);
    return res.render('user/edit_profile', {user: req.session.user, profile});
  });
  // view a profile
  router.get('/profile/:user_id', auth.mustBeInPartnership, async (req, res) => {
    const {user_id: userId} = req.params;
    const user = await services.user.get(userId);
    if (!user) return res.sendStatus(404);
    const profile = await services.profile.get(userId);
    return res.render('user/view_profile', {user, profile});
  });
  // get partnerships
  router.get('/partners', auth.mustBeLoggedIn, async (req, res) => {
    const partners = await Promise.all(
      (await services.partnership.getPartnerIds(req.session.user.id)).map(
        async (partnerId) => await services.profile.get(partnerId)
      )
    );
    return res.render('user/view_partners', {partners});
    // return res.json(partners);
  });
  router.get('/', (req, res) => {
    // TODO: figure out how to do this with a relative redirect in a way that handles "/user" and "/user/" the same way
    if (req.session.user) return res.redirect(`/user/profile/${req.session.user.id}`);
    else return res.redirect('login');
  });
  router.get('/profile/:user_id/messages', async (req, res) => {
    const {user_id: userId} = req.params;
    if (req.session.user.id !== Number(userId)) return res.redirect('./');
    const user = await services.user.get(userId);
    if (!user) return res.sendStatus(404);
    const messages = await services.get;
    return res.render('user/message_screen', {user, messages});
  });
  return router;
};
