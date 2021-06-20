//Requires
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');
const db = require('./Postgres');
//Static Routes
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev')) // logging
/*
app.use('/login', (req, res) => { // Request from the client
    res.send({
        token: 'test'
    });
});
*/

app.post('/login', (req, res) => {
    db.checkUserExists(req, res);
});


app.post('/hash', (req, res) => {
    const bcrypt = require('bcrypt');
    const saltRounds = 12;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if(err) { req.status(403).send("Error en el metodo hash")}
        res.status(200).send({hashedPassword: hash});
    });
});

//Main App Route
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));



const port = 1337;

//Run Server
//app.listen(process.env.PORT || port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));

server.listen(port, () => {
    console.log(chalk.blue(`Socket.io listening on port ${port}`))
});

// Especificar peticiones personalizadas:

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const { runInNewContext } = require('vm');
var LED = new Gpio(4, 'high'); //use GPIO pin 4 as output
var limitSwitch = new Gpio(17, 'in', 'both');
var relay = new Gpio(18, 'low');

io.on('connection', (socket) => {
    console.log(chalk.green("User connected to socket"));
    socket.emit('initialSetup', {
        filament: ''+limitSwitch.readSync()
    });
    limitSwitch.watch((err,value) => {
        if(err) {
            console.error(chalk.red('There was an error in the limit witch'), err);
            return;
        }
        socket.emit('filamentStatus', value);
        console.log(chalk.blue('Led change tocvalue: ${value}'));
        LED.writeSync(value);
    });
    socket.on('shutdown', () => {
        relay.writeSync(1);    
        setTimeout(() => relay.writeSync(0), 200);
    });
});


