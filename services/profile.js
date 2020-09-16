const PROFILE_COLUMNS = [
  'github',
  'linkedIn',
  'picture',
  'portfolio',
  'resume',
  'website',
  'firstName',
  'lastName',
];

module.exports = (_, {User, Profile}) => ({
  async get(userId) {
    if (!userId) return;
    const profile = await Profile.findOne({
      where: {userId},
      include: {model: User, attributes: ['username', 'createdAt']},
    });
    if (!profile) return;
    return profile.get({plain: true});
  },

  async update(userId, profileData) {
    const [profile] = await Profile.findOrCreate({where: {userId}});
    Object.entries(profileData)
      .filter(([key]) => PROFILE_COLUMNS.includes(key))
      .forEach(([key, value]) => (profile[key] = value ? value : null));
    await profile.save();
    return profile.get({plain: true});
  },

  async delete(userId) {
    const profile = await Profile.findOne({where: {userId}});
    if (!profile) return;
    const deletedCount = await profile.destroy();
    if (deletedCount) return profile;
  },
});
