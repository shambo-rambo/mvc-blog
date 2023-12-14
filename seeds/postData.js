const {Post} = require('../models');

const postData = [
    {
        title: 'Test Post 1',
        content: 'This is the first test post',
        created_at: new Date(),
        user_id: 1
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;