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
      email: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {isEmail: true}},
      password: {type: DataTypes.STRING, allowNull: false},
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: async (userData) => {
          userData.password = await userData.setPassword(userData.password);
          return userData;
        },
        beforeBulkCreate: async (instances) => {
          for (const instance of instances)
            instance.password = await instance.setPassword(instance.password);
        },
        beforeUpdate: async (userData) => {
          userData.password = await userData.setPassword(userData.password);
          return userData;
        },
        beforeBulkUpdate: async (instances) => {
          for (const instance of instances)
            instance.password = await instance.setPassword(instance.password);
        },
      },
      sequelize,
      modelName: 'user',
      underscored: true,
    }
  );
