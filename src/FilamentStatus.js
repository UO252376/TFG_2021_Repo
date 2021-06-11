import React from 'react';

export default class FilamentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filament : true};
        this.readSensor = this.readSensor.bind(this);
        // Esto de momento no
        //const spawn = require("child_process").spawn;
        //const pythonProcess = spawn('python',["./python/filamentSensor.py"]);

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
        pythonProcess.stdout.on('data', (data) => {
            this.setState((state, props) => ({
                filament: !state.filament
            }));
        });
    }

    render() {
        var isFilament = this.state.filament;
        return (
            <div>
                <span>Filament status: </span>
                {
                    isFilament ?
                       <span style='width:10px; height:10px; background-color:red;display:inline-block;'></span> :
                       <span style='width:10px; height:10px; background-color:green;display:inline-block;'></span>
                }
            </div>
        );
    }
}