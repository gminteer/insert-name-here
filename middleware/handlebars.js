module.exports = () => ({
  sessionLocals(req, res, next) {
    res.locals.session = req.session;
    next();
  },
  appName(req, res, next) {
    res.locals.appName = process.env.APP_NAME;
    next();
  },
});
