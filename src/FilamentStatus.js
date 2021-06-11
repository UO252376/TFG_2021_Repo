import React from 'react';
import socketIO from socket.io-client;

export default class FilamentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filament : true};
        this.readSensor = this.readSensor.bind(this);
        // Esto de momento no
        //const spawn = require("child_process").spawn;
        //const pythonProcess = spawn('python',["./python/filamentSensor.py"]);
        this.lightValue = 1;
        this.changeLight = this.changeLight.bind(this);
        this.socket = socketIO();
    }

    componentDidMount() {
        this.intervalId = setInterval(
            () => this.readSensor(),
            5000
        );
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
    
    readSensor() {
        this.setState((state, props) => ({
            filament: !state.filament
        }));
    }

    changeLight(){
        this.socket.emit('light', this.lightValue);
        this.lightValue = this.lightValue == 0 ? 1 : 0;
    }

    render() {
        var isFilament = this.state.filament;
        return (
            <div>
                <span>Filament status: </span>
                {
                    isFilament ?
                       <span className="redBox"></span> :
                       <span className="greenBox"></span>
                }
                <button onClick={this.changeLight}>Change</button>
            </div>
        );
    }
}