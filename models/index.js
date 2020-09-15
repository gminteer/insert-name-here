module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Profile = require('./profile')(sequelize);
  const Partnership = require('./partnership')(sequelize);
  const Rating = require('./rating')(sequelize);
  const Skill = require('./skill')(sequelize);
  const SkillRank = require('./skillrank')(sequelize);
  const SkillSet = require('./skillset')(sequelize);

  // -- Relationships
  // User <-> Profile
  User.hasOne(Profile);
  Profile.belongsTo(User);
  // User <-> Partnership
  User.hasMany(Partnership, {foreignKey: 'primaryId', as: 'primary'});
  Partnership.belongsTo(User, {foreignKey: 'primaryId'});
  User.hasMany(Partnership, {foreignKey: 'secondaryId', as: 'secondary'});
  Partnership.belongsTo(User, {foreignKey: 'secondaryId'});
  // Rating <-> Partnership
  Partnership.hasMany(Rating);
  Rating.belongsTo(Partnership);
  // Rating <-> User
  User.hasMany(Rating, {foreignKey: 'ownerId', as: 'owner'});
  Rating.belongsTo(User, {foreignKey: 'ownerId'});
  User.hasMany(Rating, {foreignKey: 'targetId', as: 'target'});
  Rating.belongsTo(User, {foreignKey: 'targetId'});
  // Skill <-> SkillRank
  Skill.hasMany(SkillRank);
  SkillRank.belongsTo(Skill);
  // SkillSet <-> SkillRank
  SkillSet.hasMany(SkillRank);
  SkillRank.belongsTo(SkillSet);
  // User <-> SkillSet
  SkillSet.hasOne(User, {foreignKey: 'knownSkillsetId', as: 'knownSkillset'});
  User.belongsTo(SkillSet, {foreignKey: 'knownSkillsetId'});
  SkillSet.hasOne(User, {foreignKey: 'wantedSkillsetId', as: 'wantedSkillset'});
  User.belongsTo(SkillSet, {foreignKey: 'wantedSkillsetId'});

  return {User, Profile, Rating, Partnership, Skill, SkillRank, SkillSet};
};
