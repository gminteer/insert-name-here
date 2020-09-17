const router = require('express').Router();

module.exports = ({skillset: skillsetSvc}, {auth, validation}, handleErr) => {
  router.get(
    '/wanted/:user_id',
    validation.userIdMustExist,
    auth.mustBeInPartnership,
    async (req, res) => {
      try {
        const {user_id: userId} = req.params;
        const skillset = await skillsetSvc.get(userId, 'WANTED');
        return res.json(skillset);
      } catch (err) {
        handleErr(req, res, err);
      }
    }
  );
  router.get(
    '/known/:user_id',
    validation.userIdMustExist,
    auth.mustBeInPartnership,
    async (req, res) => {
      try {
        const {user_id: userId} = req.params;
        const skillset = await skillsetSvc.get(userId, 'KNOWN');
        return res.json(skillset);
      } catch (err) {
        handleErr(req, res, err);
      }
    }
  );
  router.get('/unused-skills', auth.mustBeLoggedIn, async (req, res) => {
    try {
      const unusedSkills = await skillsetSvc.getUnusedSkills(req.session.user.id);
      return res.json(unusedSkills);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  router.put('/known/:user_id', auth.mustOwnEndpoint, async (req, res) => {
    try {
      const {user_id: userId} = req.params;
      const skillset = await skillsetSvc.update(userId, 'KNOWN', req.body);
      return res.json(skillset);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  router.put('/wanted/:user_id', auth.mustOwnEndpoint, async (req, res) => {
    try {
      const {user_id: userId} = req.params;
      const skillset = await skillsetSvc.update(userId, 'WANTED', req.body);
      return res.json(skillset);
    } catch (err) {
      handleErr(req, res, err);
    }
  });
  return router;
};
