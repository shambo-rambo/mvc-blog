const {User} = require('../models');

const userData = [
    {
        first_name: 'Anna',
        last_name: 'Mannix',
        username: 'annajane',
        password: 'password',
        email: 'annajane@gmail.com'
    },
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true,});

module.exports = seedUsers;