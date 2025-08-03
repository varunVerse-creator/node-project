const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const sequelize = require('./config/db'); 
require('dotenv').config();
const path = require('path');

const {Server} = require('socket.io')
const http = require('http')

app.use(express.json());
app.use('/user', userRouter);

//Chat....................................................

const server = http.createServer(app)
const io = new Server(server)

require('./socket')(io); 
// .........................................................



//Ejs file................................................
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/index', (req, res) => {
    res.render('index');
});


//Database and server connection...........................
const sequelizeAndServerConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });

        server.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running at ${process.env.SERVER_PORT}`);
        });
    } catch (err) {
        console.log(`Error while connecting DB or server:=> ${err}`);
    }
};

sequelizeAndServerConnection();
