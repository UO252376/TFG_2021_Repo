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

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

import BlinkLight from './src/rest/blinkingLightExample';
io.sockets.on('connection', (socket) => {// WebSocket Connection
    var lightvalue = 0; //static variable for current status
    var blinkLight = new BlinkLight();
    socket.on('light', function(data) { //get light switch status from client
        lightvalue = data;
        if (lightvalue) {
            console.log(lightvalue); //turn LED on or off, for now we will just show it in console.log
            blinkLight.switchLight();
            socket.emit('light', lightvalue);
        }
    });
});

const port = 1337;
//Run Server
app.listen(process.env.PORT || port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));
