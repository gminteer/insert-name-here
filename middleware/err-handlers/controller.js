module.exports = (services) => ({
  errPage(err, req, res, next) {
    switch (err.message) {
      case 'NOT_LOGGED_IN':
        return res.redirect('/');
    }
    return res.render('error', {err});
  },
});
