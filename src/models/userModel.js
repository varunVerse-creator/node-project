const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const User = sequelize.define('User',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    phoneNumber:{
        type:DataTypes.STRING,
        unique:true
    },

    email:{
        type:DataTypes.STRING,
        unique:true
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},

{
 timestamps:true 
}
);

module.exports = User