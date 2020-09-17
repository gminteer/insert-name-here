const {Model, DataTypes} = require('sequelize');

class Messages extends Model {}

module.exports = (sequelize) => 
Messages.init(
    {
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'messages'
    }
);