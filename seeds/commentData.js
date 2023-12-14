const {Comment} = require('../models');

const commentData = [
    {
        content: 'This is the first test comment',
        user_id: 1,
        post_id: 1
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;