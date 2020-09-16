class ValidationError extends Error {}

module.exports = (services) => ({
  async partnershipIdMustExist(req, res, next) {
    const {partnership_id: id} = req.params;
    const partnership = await services.partnership.get(id);
    if (!partnership) next(new ValidationError('NOT_FOUND'));
    next();
  },
  async userIdMustExist(req, res, next) {
    const {user_id: id} = req.params;
    const user = await services.user.get(id);
    if (!user) next(new ValidationError('NOT_FOUND'));
    next();
  },
});
