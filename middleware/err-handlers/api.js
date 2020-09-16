const ERRORS = {
  ALREADY_LOGGED_IN: {message: 'Already logged in', code: 400},
  NOT_LOGGED_IN: {message: 'Not logged in', code: 403},
  NOT_FOUND: {message: 'Resource not found', code: 404},
  NOT_PARTNERED: {message: 'Not in partnership with resource owner', code: 403},
};

module.exports = (services) => ({
  jsonify(err, req, res, next) {
    const errData = ERRORS[err.message];
    return res.status(errData.code).json({message: errData.message});
  },
});
