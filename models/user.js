const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(pwInput) {
    return bcrypt.compare(pwInput, this.password);
  }
  setPassword(pwInput) {
    return bcrypt.hash(pwInput, 10);
  }
}

module.exports = (sequelize) =>
  User.init(
    {
      username: {type: DataTypes.STRING(30), allowNull: false, unique: true, validate: {len: [1]}},
      password: {type: DataTypes.STRING, allowNull: false},
    },
    {
      hooks: {
        beforeCreate: async (userData) => {
          userData.password = await userData.setPassword(userData.password);
          return userData;
        },
        beforeUpdate: async (userData) => {
          userData.password = await userData.setPassword(userData.password);
          return userData;
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
