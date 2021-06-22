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

const securityPhrase = "compruebaUsuarioSeguroYa";
const bcrypt = require('bcrypt');

//ROUTES
app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev'));

app.post('/login', (req, res) => {
    db.checkUserExists(req.body, res, securityPhrase);
});

//MAIN PAGE
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/image_stream.jpg', (req, res) => res.sendFile(path.join(__dirname, '/stream/image_stream.jpg')));

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

io.use((socket, next) => {
    if(socket.handshake.query && socket.handshake.query.token) {
        bcrypt.compare(securityPhrase, socket.handshake.query.token).then(result => {
            if(result) next();
            else next(new Error('Authentication error'));
        });
    } else  next(new Error('Authentication error'));
}).on('connection', (socket) => {
    // SETUP
    sockets[socket.id] = socket;
    console.log(chalk.green("User connected to socket"));
    socket.on('dataRequest', () => {
        socket.emit('initialSetup', {
            filament: ''+limitSwitch.readSync()
        });
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
      io.sockets.emit('liveStream', 'image_stream.jpg');
      return;
    }
   
    var args = ["-w", "640", "-h", "480", "-o", path.join(__dirname, '/stream/image_stream.jpg'), "-t", "999999999", "-tl", "40"];
    proc = spawn('raspistill', args);
   
    console.log('Watching for changes...');
   
    app.set('watchingFile', true);
   
    fs.watchFile(path.join(__dirname, '/stream/image_stream.jpg'), {bigInt: false, persistent: true, interval: 40}, function(current, previous) {
      io.sockets.emit('liveStream', 'image_stream.jpg');
    });
}

function stopStreaming() {
    app.set('watchingFile', false);
    if (proc) proc.kill();
    fs.unwatchFile(path.join(__dirname, '/stream/image_stream.jpg'));
}


// PRINTER SERIAL CONNECTION
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');
const serialPort = new SerialPort('/dev/ttyUSB0', {baudRate: 115200, autoOpen: true});
    
const lineStream = serialPort.pipe(new ReadLine());

serialPort.on('connect', () => {
    lineStream.on('data', (data) => {
        io.sockets.emit('printerFeed', data);
        console.log("lineStream on data (in on connect)")
        console.log(data);
    });
    //serialPort.write('M155 S3\n');
})


lineStream.on('data', (data) => {
    io.sockets.emit('printerFeed', data);
    console.log("lineStream on data (outside on connect)")
    console.log(data);
})
setTimeout(() => serialPort.write('M155 S3\n'), 5000);

