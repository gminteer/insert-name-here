const router = require('express').Router();

module.exports = ({user: userSvc}, {auth}, handleErr) => {
  // get all users
  router.get('/', async (req, res) => {
    try {
      const users = await userSvc.get();
      if (users.length < 1) return res.status(404).json({message: 'No users in database'});
      return res.json(users);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  // get a specific user by ID
  router.get('/:user_id', async (req, res) => {
    try {
      const id = req.params.user_id;
      const user = await userSvc.get(id);
      if (!user) return res.status(404).json({message: `No user found with id: "${id}"`});
      return res.json(user);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  // create a user
  router.post('/', auth.mustNotBeLoggedIn, async (req, res) => {
    try {
      const user = await userSvc.create(req.body);
      req.session.save(() => {
        req.session.user = user;
        req.session.isLoggedIn = true;
        return res
          .status(201)
          .append('Location', user.id)
          .json({user, message: 'Login successful'});
      });
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  // update a user
  router.put('/:user_id', auth.mustOwnEndpoint, async (req, res) => {
    const id = req.params.user_id;
    try {
      const user = await userSvc.update(id, req.body);
      if (!user) return res.status(404).json({message: `No user found with id: "${id}"`});
      return res.json({message: 'Update successful', user});
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  // delete a user
  router.delete('/:user_id', auth.mustOwnEndpoint, async (req, res) => {
    const id = req.params.user_id;
    try {
      const user = await userSvc.delete(id);
      // only ring the alarm bell outside of production. not sure if this is the best idea
      // the problem being detected won't actually impact the user in any real way
      if (!user && process.env.NODE_ENV !== 'production') {
        return res.status(500).json({
          message: `No user found with id: "${id}", but id matches currently logged in user. Database is likely corrupt.`,
        });
      }
      req.session.destroy(() => res.json({message: 'User deleted', user}));
    } catch (err) {
      handleErr(req, res, err);
    }
  });

  router.post('/login', auth.mustNotBeLoggedIn, async (req, res) => {
    try {
      const {username, password} = req.body;
      if (!username || !password) return res.status(400).json({message: 'Missing required fields'});
      const login = await userSvc.login(username, password);
      if (!login.ok) {
        switch (login.error) {
          case 'NOT_FOUND':
            return res.status(404).json({message: `No user found with username: "${username}"`});
          case 'BAD_PASSWORD':
            return res.status(403).json({message: 'Invalid password'});
        }
      }
      req.session.save(() => {
        req.session.user = login.user;
        req.session.isLoggedIn = true;
        return res.json({user: login.user, message: 'Login successful'});
      });
    } catch (err) {
      handleErr(req, res, err);
    }
  });

  router.post('/logout', auth.mustBeLoggedIn, (req, res) => {
    req.session.destroy(() => res.json({message: 'Logout successful'}));
  });

  return router;
};
