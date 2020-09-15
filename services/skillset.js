const TYPES = {KNOWN: 'knownSkillsetId', WANTED: 'wantedSkillsetId'};

module.exports = (_, {User, Skill, SkillRank, SkillSet}) => ({
  async get(userId, type) {
    if (!userId || !Object.keys(TYPES).includes(type)) return;
    const user = await User.findOne({where: {id: userId}});
    const {id: skillsetId} = await SkillSet.findOne({where: {id: user[TYPES[type]]}});
    const skillRanks = await SkillRank.findAll({where: {skillsetId}, include: {model: Skill}});
    return skillRanks.map((skillRank) => skillRank.get({plain: true}));
  },
  update(userId, type, data) {
    if (!userId || !Object.keys(TYPES).includes(type)) return;
    // TODO
  },
  delete(userId, type) {
    if (!userId || !Object.keys(TYPES).includes(type)) return;
    // TODO
  },
});
