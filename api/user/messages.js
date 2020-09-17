const router = require('express').Router();
const { Op } = require('sequelize');
const Messages = require('../../models/messages');

module.exports = (services, middleware) => {
// get all messages for the one user
router.get('/:user_Id', (req, res) => {
    const userId = req.params;
    const userPartnerships = services.partnership.getUserPartnerships(userId).then(partnerArr => partnerArr.map((partnership) => ({partnershipId: partnership.id})));
    Messages.findAll(
        {
            where: {
                [Op.or]: userPartnerships,
            },
            attributes: [
                'body'
            ]
        })
        .then(dbMessages => {
            if (!dbMessages) {
                return res.json({message: 'No Messages'});
            }
            res.json(dbMessages);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
return router;
};




