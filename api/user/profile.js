const router = require('express').Router();

module.exports = ({profile: profileSvc}, {auth}, handleErr) => {
  // get a profile by user ID
  router.get('/:user_id', auth.mustBeInPartnership, async (req, res) => {
    try {
      const {user_id: userId} = req.params;
      const profile = await profileSvc.get(userId);
      if (!profile)
        return res.status(404).json({message: `No profile found for user with id "${userId}`});
      return res.json(profile);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  // change a profile by user ID
  router.put('/:user_id', auth.mustOwnEndpoint, async (req, res) => {
    try {
      const {user_id: userId} = req.params;
      const profile = await profileSvc.update(userId, req.body);
      return res.json({message: 'Profile updated successfully', profile});
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  // delete a profile by user ID
  router.delete('/:user_id', auth.mustOwnEndpoint, async (req, res) => {
    try {
      const {user_id: userId} = req.params;
      const profile = await profileSvc.delete(userId);
      return res.json({message: 'Profile deleted successfully', profile});
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  return router;
};
