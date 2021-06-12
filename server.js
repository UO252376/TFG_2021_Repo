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
//Static Routes
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev')) // logging
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
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var limitSwitch = new Gpio(17, 'in', 'both');

io.on('connection', (socket) => {
    console.log(chalk.green('a user connected'));
    socket.on('light', (data) => {
        LED.writeSync(data);
        console.log(chalk.blue(`Led change`));
        socket.emit('light', data);
    });
});

limitSwitch.watch((err, value) => {
    if(err) {
        console.error(chalk.red('There was an error in the limit witch'), err);
        return;
    }
    LED.writeSync(value);
    console.log(chalk.blue(`Led change`));
});

