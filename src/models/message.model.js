const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Message = sequelize.define('Messages',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        unique:true,
        defaultValue:DataTypes.UUIDV4
    },

    senderId:{
        type:DataTypes.UUID,
        allowNull:false
    },

    receiverId:{
        type:DataTypes.UUID,
        allowNull:false
    },

    message:{
        type:DataTypes.STRING,
        defaultValue:''
    },

    roomId:{
        type:DataTypes.STRING,
        allowNull:false
    },

},
{
    timestamps:true
}
)

module.exports = Message