const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
    {
        // Assuming 'id' is the primary key
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        // Foreign key for the user
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        // Foreign key for the post
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'Comment'
    }
);

module.exports = Comment;