const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  async checkPassword(pwInput) {
    return await bcrypt.compare(pwInput, this.password);
  }
  async setPassword(pwInput) {
    return await bcrypt.hash(pwInput, 10);
  }
}

module.exports = (sequelize) =>
  User.init(
    {
      username: {type: DataTypes.STRING(30), allowNull: false, unique: true, validate: {len: [1]}},
      email: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {isEmail: true}},
      password: {type: DataTypes.STRING(60), allowNull: false},
    },
    {
      hooks: {
        beforeCreate: async (instance) => {
          instance.password = await instance.setPassword(instance.password);
          return instance;
        },
        beforeBulkCreate: async (instances) => {
          for (const instance of instances)
            instance.password = await instance.setPassword(instance.password);
        },
        beforeUpdate: async (instance) => {
          if (instance.changed().includes('password'))
            instance.password = await instance.setPassword(instance.password);
          return instance;
        },
        beforeBulkUpdate: async (instances) => {
          for (const instance of instances) {
            if (instance.changed().inclues('password'))
              instance.password = await instance.setPassword(instance.password);
          }
        },
      },
      sequelize,
      underscored: true,
      modelName: 'user',
    }
  );
