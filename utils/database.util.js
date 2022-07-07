const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './confidential.env' });

//Connect to database
const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    logging: false,
    dialectOptions: process.env.NODE_ENV === 'production' ? {
        ssl: {
            required: true,
            rejectUnauthorized: false
        },
    } : {},
});

module.exports = { db, DataTypes };