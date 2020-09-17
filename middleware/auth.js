class AuthError extends Error {}

module.exports = (services) => ({
  mustNotBeLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) next(new AuthError('ALREADY_LOGGED_IN'));
    next();
  },
  mustBeLoggedIn(req, res, next) {
    if (!req.session.isLoggedIn) next(new AuthError('NOT_LOGGED_IN'));
    next();
  },
  mustOwnEndpoint(req, res, next) {
    if (!req.session.isLoggedIn) next(new AuthError('NOT_LOGGED_IN'));
    if (req.params.user_id !== req.session.user.id.toString())
      return res.status(403).json({message: 'Not resource owner'});
    next();
  },
  async mustOwnPartnership(req, res, next) {
    if (!req.session.isLoggedIn) next(new AuthError('NOT_LOGGED_IN'));
    const {partnership_id: id} = req.params;
    const partnership = await services.partnership.get(id);
    if (!partnership) next(new AuthError('NOT_FOUND'));
    if (![partnership.primaryId, partnership.secondaryId].includes(req.session.user.id))
      throw new AuthError('NOT_OWNER');
    next();
  },
  async mustBeInPartnership(req, res, next) {
    if (!req.session.isLoggedIn) next(new AuthError('NOT_LOGGED_IN'));
    const userId = req.session.user.id;
    const {user_id: targetId} = req.params;
    const partnerIds = await services.partnership.getPartnerIds(userId);
    partnerIds.push(userId);
    if (!partnerIds.includes(Number(targetId))) next(new AuthError('NOT_PARTNERED'));
    next();
  },
});
