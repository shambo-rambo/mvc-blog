const {User} = require('../models');

const userData = [
    {
        first_name: 'Simon',
        last_name: 'Hamblin',
        username: 'shambo',
        password: 'password1',
        email: 'simon.hamblin@gmail.com'
    },
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true,});

module.exports = seedUsers;