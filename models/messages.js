const { Model, Datatypes } = require('sequelize');
const partnership = require('./partnership');

class Messages extends Model {}

Messages.init({
    body: {
        type: Datatypes.VARCHAR(500),
        allowNull: false,
    },
    conversation_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
            model: 'partnership',
            key: 'id'
        }
    },
    author_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }

},
{
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'messages'
}
)