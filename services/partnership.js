const {Op} = require('sequelize');

module.exports = (_, {Partnership}) => ({
  async get(id) {
    const partnership = await Partnership.findOne({where: {id}});
    if (!partnership) return;
    return partnership.get({plain: true});
  },

  async getUserPartnerships(userId) {
    const partnerships = await Partnership.findAll({
      where: {[Op.or]: [{primaryId: userId}, {secondaryId: userId}]},
    });
    return partnerships.map((partnership) => partnership.get({plain: true}));
  },

  async update(id, {status}) {
    if (!Partnership.STATUS.includes(status)) return {error: 'STATUS_INVALID'};
    const partnership = await Partnership.findOne({where: {id}});
    if (!partnership) return;
    if (process.env.NODE_ENV === 'production' && partnership.status === 'CLOSED')
      return {error: 'PARTNERSHIP_CLOSED'};
    partnership.status = status;
    await partnership.save();
    return partnership.get({plain: true});
  },
});
