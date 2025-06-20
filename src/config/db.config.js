const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.authenticate()
    .then(() => {
        console.log('✅ Sequelize connection has been established successfully.');
    })
    .catch(err => {
        console.error('❌ Unable to connect to the database:', err);
    });

// Add models
db.Post = require('../models/post.model')(sequelize, Sequelize);

module.exports = db;
