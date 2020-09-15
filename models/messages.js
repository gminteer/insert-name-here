const { Model, Datatypes } = require('sequelize');

class Messages extends Model {}

Messages.init({
        body: {
            type: Datatypes.VARCHAR(500),
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'messages'
    }
)