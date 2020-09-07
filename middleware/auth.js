module.exports = (services) => ({
  mustNotBeLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) return res.status(400).json({message: 'Already logged in'});
    next();
  },
  mustBeLoggedIn(req, res, next) {
    if (!req.session.isLoggedIn) return res.status(403).json({message: 'Not logged in'});
    next();
  },
  mustOwnEndpoint(req, res, next) {
    if (!req.session.isLoggedIn) return res.status(403).json({message: 'Not logged in'});
    if (req.params.user_id !== req.session.user.id.toString())
      return res.status(403).json({message: 'Not resource owner'});
    next();
  },
});
