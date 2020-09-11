const {Op} = require('sequelize');

module.exports = (_, {User, Partnership}) => ({
  async get(id) {
    const partnership = await Partnership.findOne({where: {id}});
    if (!partnership) return;
    return partnership.get({plain: true});
  },

  async create(primaryId, {secondaryId}) {
    if (primaryId === secondaryId) return {error: 'INVALID_PARTNERSHIP'};
    const secondaryUser = await User.findOne({where: {id: secondaryId}});
    if (!secondaryUser) return {error: 'INVALID_SECONDARY_USER'};
    const duplicate = await Partnership.findOne({
      where: {
        [Op.or]: [
          {primaryId, secondaryId},
          {primaryId: secondaryId, secondaryId: primaryId},
        ],
      },
    });
    if (duplicate) {
      switch (duplicate.status) {
        case 'MATCHED':
        case 'ACTIVE':
          return {error: 'ALREADY_EXISTS'};
        case 'BLOCKED':
          return {error: 'BLOCKED'};
        case 'CLOSED': {
          duplicate.status = 'MATCHED';
          await duplicate.save();
          return duplicate;
        }
      }
    }
    const partnership = await Partnership.create({primaryId, secondaryId, status: 'MATCHED'});
    return partnership;
  },

  async getUserPartnerships(userId) {
    const partnerships = await Partnership.findAll({
      where: {[Op.or]: [{primaryId: userId}, {secondaryId: userId}]},
    });
    return partnerships.map((partnership) => partnership.get({plain: true}));
  },

  async getPartnerIds(userId) {
    const partnerships = await Partnership.findAll({
      where: {[Op.or]: [{primaryId: userId}, {secondaryId: userId}]},
    });
    return partnerships
      .map((partnership) => partnership.get({plain: true}))
      .filter((partnership) => !['BLOCKED', 'CLOSED'].includes(partnership.status))
      .map((partnership) =>
        userId === partnership.primaryId ? partnership.secondaryId : partnership.primaryId
      );
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

  async match(userId) {
    // TODO: this needs to hook into skillsWant, skillsHave, ratings
    // Other things that need to be considered
    //  - potential matches with lots of active partnerships should be de-prioritized
    //  - potential matches with a wide skill imbalance should be de-prioritized
    //  - users with bad ratings should be de-prioritized
    //  - highly ranked skillsWant & skillsHave should be prioritized
  },
});
