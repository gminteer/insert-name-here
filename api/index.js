const router = require('express').Router();

function handleErr(req, res, err) {
  console.error(err);
  if (['SequelizeUniqueConstraintError', 'SequelizeValidationError'].includes(err.name)) {
    let errors;
    if (process.env.NODE_ENV === 'production') {
      errors = err.errors.map((error) => {
        const {instance: _, ...sanitizedError} = error;
        return sanitizedError;
      });
    } else {
      errors = err.errors;
    }
    return res.status(422).json(errors);
  }
  if (process.env.NODE_ENV !== 'production') return res.status(500).json(err);
  else return res.sendStatus(500);
}

module.exports = (services, middleware) => {
  router.use('/user', require('./user')(services, middleware, handleErr));
  router.use('/partnership', require('./partnership')(services, middleware, handleErr));
  router.use('/skillset', require('./skillset')(services, middleware, handleErr));
  router.use(middleware.errHandlers.api.jsonify);
  return router;
};
