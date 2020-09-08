const router = require('express').Router();

module.exports = ({user: userSvc}, {auth}, handleErr) => {
  router.get('/', async (req, res) => {
    try {
      const users = await userSvc.get();
      if (users.length < 1) return res.status(404).json({message: 'No users in database'});
      return res.json(users);
    } catch (err) {
      handleErr(req, res, err);
    }
  });

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

  router.post('/', auth.mustNotBeLoggedIn, async (req, res) => {
    try {
      const user = await userSvc.create(req.body);
      req.session.save(() => {
        req.session.user = user;
        req.session.isLoggedIn = true;
        return res
          .status(201)
          .append('Location', user.id)
          .json({username: user.username, message: 'Login successful'});
      });
    } catch (err) {
      handleErr(req, res, err);
    }
  });

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

  router.delete('/:user_id', auth.mustOwnEndpoint, async (req, res) => {
    const id = req.params.user_id;
    try {
      const user = await userSvc.delete(id);
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
