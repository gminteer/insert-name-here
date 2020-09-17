const {Op} = require('sequelize');
const TYPES = {KNOWN: 'knownSkillsetId', WANTED: 'wantedSkillsetId'};

module.exports = (_, {User, Skill, SkillRank, SkillSet}) => ({
  async get(userId, type) {
    if (!userId || !Object.keys(TYPES).includes(type)) return;
    const user = await User.findOne({where: {id: userId}});
    const skillset = await SkillSet.findOne({where: {id: user[TYPES[type]]}});
    if (!skillset) return;
    const skillRanks = await SkillRank.findAll({
      where: {skillsetId: skillset.id},
      include: {model: Skill},
    });
    return skillRanks.map((skillRank) => skillRank.get({plain: true}));
  },
  async update(userId, type, data) {
    if (!userId || !Object.keys(TYPES).includes(type)) return;
    const user = await User.findOne({where: {id: userId}});
    const [skillset, created] = await SkillSet.findOrCreate({where: {id: user[TYPES[type]]}});
    const skillRanks = created
      ? []
      : await SkillRank.findAll({
          where: {skillsetId: skillset.id},
          include: {model: Skill},
        });
    skillRanks.forEach(async (skillRank) => {
      if (!Object.keys(data).includes(skillRank.skill.id.toString())) {
        await skillRank.destroy();
      } else {
        skillRank.rank = data[skillRank.skill.id];
        await skillRank.save();
      }
    });
    const seenSkills = skillRanks.map((rank) => rank.skill.id);
    const newSkills = Object.entries(data).filter(
      ([skillId]) => !seenSkills.includes(Number(skillId))
    );
    if (newSkills.length > 1) {
      await Promise.all(
        newSkills.forEach(
          async ([skillId, rank]) =>
            await SkillRank.create({skillsetId: skillset.id, skillId, rank})
        )
      );
    }
    return data;
  },
  async getUnusedSkills(userId) {
    if (!userId) return;
    const user = await User.findOne({where: {id: userId}});
    const usedSkills = (
      await SkillRank.findAll({
        where: {[Op.or]: [{skillsetId: user.knownSkillsetId}, {skillsetId: user.wantedSkillsetId}]},
      })
    ).map((rank) => rank.skillId);
    const unusedSkills = (await Skill.findAll())
      .filter((skill) => !usedSkills.includes(skill.id))
      .map((skill) => skill.get({plain: true}));
    return unusedSkills;
  },
});
