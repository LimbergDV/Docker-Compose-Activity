const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT
   }
);

const db = {};
db.ORM = Sequelize;
db.connection = sequelize;

//Import models
db.car = require('./car')(sequelize, Sequelize);
db.customer = require('./customer')(sequelize,Sequelize);
db.rent= require('./rent')(sequelize,Sequelize);
module.exports = db;

