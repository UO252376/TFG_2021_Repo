//Requires
const path = require('path');
const chalk = require('chalk');

const express = require('express');
const { Server } = require("socket.io");
const socketIoAuth = require("socketio-auth");
const onoff = require('onoff');
const http = require('http');


// CONSTANTES
const port = 1337;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const Gpio = onoff.Gpio;

const LED = new Gpio(4, 'high'); //use GPIO pin 4 as output
const limitSwitch = new Gpio(17, 'in', 'both');
const relay = new Gpio(18, 'low');

// CONECTAR A BASE DE DATOS


// AUTENTICACIÓN DE USUARIO

async function authenticate (socket, data, callback) {
    // const {username, password} = data;
    try {
        // var user = null; // find user in database
        callback(null, () => {
            socket.emit('loginResponse', { login: true /* user  && user.hashedPassword === */} );
            return true /* user  && user.hashedPassword === */;
        });
    } catch (error) {
        callback(error);
    }
}

// ACCIONES DE USUARIO
function postAuthenticate(socket) {
    // FILAMENT STATUS
    socket.emit('filamentStatus', limitSwitch.readSync());
    limitSwitch.watch((err,value) => {
        if(err) {
            console.error(chalk.red(`There was an error in the limit witch`), err);
            return;
        }
        socket.emit('filamentStatus', value);
        console.log(chalk.blue(`Led change tocvalue: ${value}`));
        LED.writeSync(value);
    });

    // SHUTDOWN
    socket.on('shutdown', () => {
        relay.writeSync(1);    
        setTimeout(() => relay.writeSync(0), 200);
    });

}

/*
io.on('connection', (socket) => {
    console.log(chalk.green("User connected to socket"));
    limitSwitch.watch((err,value) => {
        if(err) {
            console.error(chalk.red(`There was an error in the limit witch`), err);
            return;
        }
        socket.emit('filamentStatus', value);
        console.log(chalk.blue(`Led change tocvalue: ${value}`));
        LED.writeSync(value);
    });
    socket.on('shutdown', () => {
        relay.writeSync(1);    
        setTimeout(() => relay.writeSync(0), 200);
    });
});
*/

// STARTUP
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

socketIoAuth(io, {authenticate, postAuthenticate});

/*
server.listen(port, () => {
    console.log(chalk.blue(`Socket.io listening on port ${port}`));
});
*/