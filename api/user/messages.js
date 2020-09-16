const router = require('express').Router();
const { Messages, Partnership } = require('../../models');

// get all messages for the one user
router.get('/messages/:partnershipId', async (req, res) => {
    const partnershipId = req.params.partnershipId;
    try {
        Messages.findAll(
        {
            where: {
                partnershipId: partnershipId,
                authorId: 'currentUser'
            }
        })
    }
})