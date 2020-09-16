const router = require('express').Router();

module.exports = (services, {auth, validation}) => {
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
  // dashboard for logged in user
  router.get('/dashboard', auth.mustBeLoggedIn, async (req, res) => {
    const profile = await services.profile.get(req.session.user.id);
    const knownSkills = await services.skillset.get(req.session.user.id, 'KNOWN');
    const wantedSkills = await services.skillset.get(req.session.user.id, 'WANTED');
    const partners = await Promise.all(
      (await services.partnership.getPartnerIds(req.session.user.id)).map(
        async (partnerId) => await services.profile.get(partnerId)
      )
    );
    return res.render('user/dashboard', {profile, partners, knownSkills, wantedSkills});
  });
  // change the currently logged in user's profile
  router.get('/profile/edit', auth.mustBeLoggedIn, async (req, res) => {
    const profile = await services.profile.get(req.session.user.id);
    return res.render('user/edit_profile', {user: req.session.user, profile});
  });
  // view a profile
  router.get(
    '/profile/:user_id',
    validation.userIdMustExist,
    auth.mustBeInPartnership,
    async (req, res) => {
      const {user_id: userId} = req.params;
      const profile = await services.profile.get(userId);
      const knownSkills = await services.skillset.get(userId, 'KNOWN');
      const wantedSkills = await services.skillset.get(userId, 'WANTED');
      return res.render('user/view_profile', {profile, knownSkills, wantedSkills});
    }
  );
  // view messages
  router.get('/messages', auth.mustBeLoggedIn, async (req, res) => {
    const messages = await services.messages.get(req.session.user.id);
    return res.render('user/message_screen', {messages});
  });
  router.get('/', (req, res) => {
    // TODO: figure out how to do this with a relative redirect in a way that handles "/user" and "/user/" the same way
    if (req.session.user) return res.redirect(`/user/dashboard`);
    else return res.redirect('login');
  });
  return router;
};
