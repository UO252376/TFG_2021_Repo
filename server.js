//Requires
const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');
//Static Routes
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev')) // logging
//Main App Route
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

// Especificar peticiones personalizadas:
const http = require('http');
const server = http.createServer(app);
const Server = require('socket.io');
const io = Server.listen(server);
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output

io.on('connection', (socket) => {
    console.log(chalk.green('a user connected'));
    socket.on('light', (data) => {
        LED.writeSync(data);
    })
});


const port = 1337;
//Run Server
app.listen(process.env.PORT || port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));
