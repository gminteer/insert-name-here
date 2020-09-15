const router = require('express').Router();

module.exports = ({partnership: partnershipSvc}, {auth}, handleErr) => {
  // get all of a user's partnerships by user ID
  router.get('/byuser/:user_id/', auth.mustOwnEndpoint, async (req, res) => {
    try {
      const {user_id: id} = req.params;
      const partnerships = await partnershipSvc.getUserPartnerships(id);
      if (partnerships.length < 1)
        return res.status(404).json({message: `User id "${id} has no partnerships`});
      return res.json(partnerships);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  // get a specific partnership by ID
  router.get('/:partnership_id', auth.mustOwnPartnership, async (req, res) => {
    try {
      const partnership = await partnershipSvc.get(req.params.partnership_id);
      return res.json(partnership);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  // change a partnership's status
  router.put('/:partnership_id', auth.mustOwnPartnership, async (req, res) => {
    try {
      const partnership = await partnershipSvc.update(req.params.partnership_id, req.body);
      if (partnership.error) return res.status(400).json({message: partnership.error});
      return res.json(partnership);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  // create a partnership
  router.post('/', auth.mustBeLoggedIn, async (req, res) => {
    try {
      const partnership = await partnershipSvc.create(req.session.user.id, req.body);
      if (partnership.error) return res.status(400).json({message: partnership.error});
      return res.json(partnership);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  return router;
};
