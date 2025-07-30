const {Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATA_USER_NAME,process.env.DATABASE_PASSWORD,{
host : 'localhost',
dialect: 'postgres',
logging:false
});

module.exports = sequelize