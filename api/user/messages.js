const router = require('express').Router();
const { Messages, Partnership } = require('../../models');
const { Op } = require('sequelize');


// get all messages for the one user
router.get('/messages/:userId', (req, res) => {
    const userId = req.params.userId;
    const userPartnerships = services.partnership.getUserPartnerships(userId).map((partnership) => ({partnershipId: partnership.id}));
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
            if (!dbMessage) {
                return 
            }
            res.json(dbMessages);
        });
});

