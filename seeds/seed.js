const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

const sequelize = require('../config/connection');

const seedAll = async () => {
    try {
        // Manually drop tables in the correct order
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.query('DROP TABLE IF EXISTS comments');
        await sequelize.query('DROP TABLE IF EXISTS posts');
        await sequelize.query('DROP TABLE IF EXISTS users');
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        // Sync database
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');

        // Seed data
        await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');

        await seedPosts();
        console.log('\n----- POSTS SEEDED -----\n');

        await seedComments();
        console.log('\n----- COMMENTS SEEDED -----\n');

        process.exit(0);
    } catch (error) {
        console.error('Error occurred during seeding:', error);
        process.exit(1);
    }
};

seedAll();
