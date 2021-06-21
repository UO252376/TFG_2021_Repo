//Requires
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');
const db = require('./Postgres');
const videoStream = require('raspberrypi-node-camera-web-streamer');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

//ROUTES
app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev'));

app.post('/login', (req, res) => {
    db.checkUserExists(req.body, res);
});

//MAIN PAGE
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));



const port = 1337;

server.listen(port, () => {
    console.log(chalk.blue(`Socket.io listening on port ${port}`))
});

// SOCKETS

const Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'high'); // FILAMENT SENSOR LIGHT
var limitSwitch = new Gpio(17, 'in', 'both'); // FILAMENT SENSOR LIMIT SWITCH
var relay = new Gpio(18, 'low'); // RELÉ PROGRAMABLE

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


