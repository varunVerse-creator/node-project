const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes')
const sequelize = require('./config/db')
require('dotenv').config()

app.use(express.json())

app.use('/user',userRouter)

const sequelizeAndServerConnection = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync({alter:true})

        app.listen(process.env.SERVER_PORT,()=>{
            console.log(`Server is running at ${process.env.SERVER_PORT}`)
        })
    }catch(err){
        console.log(`Error while connectingDB or server:=> ${err}`)
    }
}

sequelizeAndServerConnection()