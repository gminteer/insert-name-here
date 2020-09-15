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
  async mustOwnPartnership(req, res, next) {
    if (!req.session.isLoggedIn) return res.status(403).json({message: 'Not logged in'});
    const {partnership_id: id} = req.params;
    const partnership = await services.partnership.get(id);
    if (!partnership)
      return res.status(404).json({message: `No partnerships found with id "${id}"`});
    if (![partnership.primaryId, partnership.secondaryId].includes(req.session.user.id))
      return res.status(403).json({message: 'Not resource owner'});
    next();
  },
  async mustBeInPartnership(req, res, next) {
    if (!req.session.isLoggedIn) return res.status(403).json({message: 'Not logged in'});
    const userId = req.session.user.id;
    const {user_id: targetId} = req.params;
    const partnerIds = await services.partnership.getPartnerIds(userId);
    partnerIds.push(userId);
    if (!partnerIds.includes(Number(targetId)))
      return res.status(403).json({message: 'Not in partnership'});
    next();
  },
});
