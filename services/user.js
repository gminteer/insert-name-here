const USER_COLUMNS = ['username', 'password', 'email', 'firstName', 'lastName'];

module.exports = (_, {User}) => ({
  async get(id) {
    if (id) {
      const user = await User.findOne({
        attributes: {exclude: ['password']},
        where: {id: Number(id)},
      });
      if (!user) return;
      return user.get({plain: true});
    } else {
      const users = await User.findAll({attributes: {exclude: ['password']}});
      return users.map((user) => user.get({plain: true}));
    }
  },

  async create(userData) {
    const sanitizedData = Object.fromEntries(
      Object.entries(userData).filter(([key]) => USER_COLUMNS.includes(key))
    );
    const user = await User.create(sanitizedData);
    return user.get({plain: true});
  },

  async update(id, userData) {
    const user = await User.findOne({where: {id}});
    if (!user) return;
    Object.entries(userData)
      .filter(([key, value]) => USER_COLUMNS.includes(key) && value)
      .forEach(([key, value]) => (user[key] = value));
    await user.save();
    const {password: _, ...sanitizedUser} = user.get({plain: true});
    return sanitizedUser;
  },

  async delete(id) {
    const user = await User.findOne({exclude: ['password'], where: {id}});
    if (!user) return;
    const deletedCount = await user.destroy();
    const {password: _, ...sanitizedUser} = user.get({plain: true});
    if (deletedCount) return sanitizedUser;
  },

  async login(username, password) {
    const user = await User.findOne({where: {username}});
    if (!user) return {ok: false, error: 'NOT_FOUND'};
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) return {ok: false, error: 'BAD_PASSWORD'};
    const {password: _, ...sanitizedUser} = user.get({plain: true});
    return {ok: true, user: sanitizedUser};
  },
});
