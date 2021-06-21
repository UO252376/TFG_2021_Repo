//Requires
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');
const db = require('./Postgres');
const Gpio = require('onoff').Gpio;


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 1337;

//ROUTES
app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev'));

app.post('/login', (req, res) => {
    db.checkUserExists(req.body, res);
});

//MAIN PAGE
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

server.listen(port, () => {
    console.log(chalk.blue(`Socket.io listening on port ${port}`))
});


// GPIO
var LED = new Gpio(4, 'high'); // FILAMENT SENSOR LIGHT
var limitSwitch = new Gpio(17, 'in', 'both'); // FILAMENT SENSOR LIMIT SWITCH
var relay = new Gpio(18, 'low'); // RELÉ PROGRAMABLE

// SENSOR CHANGE
limitSwitch.watch((err,value) => {
    if(err) {
        console.error(chalk.red('There was an error in the limit witch'), err);
        return;
    }
    io.sockets.emit('filamentStatus', value);
    console.log(chalk.blue('Led change tocvalue: ${value}'));
    LED.writeSync(value);
});

//SOCKETS
var sockets = {};

io.on('connection', (socket) => {
    // SETUP
    sockets[socket.id] = socket;
    console.log(chalk.green("User connected to socket"));
    socket.emit('initialSetup', {
        filament: ''+limitSwitch.readSync()
    });

    // SHUTDOWN
    socket.on('shutdown', () => {
        relay.writeSync(1);    
        setTimeout(() => relay.writeSync(0), 200);
    });

    // STREAMING
    socket.on('startStreaming', () => {
        startStreaming(io);
    });

    socket.on('disconnect', () => {
        delete sockets[socket.id];
        if (Object.keys(sockets).length == 0) {
            stopStreaming();
        }
    });
});

// STREAMING FUNCTIONS
var fs = require('fs');
var spawn = require('child_process').spawn;
var proc;

function startStreaming(io) {
 
    if (app.get('watchingFile')) {
      io.sockets.emit('liveStream', 'stream/image_stream.jpg?_t=' + (Math.random() * 100000));
      return;
    }
   
    var args = ["-w", "640", "-h", "480", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "500"];
    proc = spawn('raspistill', args);
   
    console.log('Watching for changes...');
   
    app.set('watchingFile', true);
   
    fs.watchFile('./stream/image_stream.jpg', function(current, previous) {
      io.sockets.emit('liveStream', 'stream/image_stream.jpg?_t='  + (Math.random() * 100000));
    });
}

function stopStreaming() {
    app.set('watchingFile', false);
    if (proc) proc.kill();
    fs.unwatchFile('./stream/image_stream.jpg');
}
