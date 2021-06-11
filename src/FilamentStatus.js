import React from 'react';
require("socket.io");
var socket = io();

export default class FilamentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filament : true};
        this.readSensor = this.readSensor.bind(this);
        this.readSensor();

    }
    
    /**
     * Change tag estate as light changes on the back.
     */
    readSensor() {
        socket.on('light', (data) => {
            this.setState(
                (state, props) => ({
                    filament: !state.filament
                })
            );
		});
    }

    changeLight() {
        socket.emit('light', 1);
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
                <button onClick={this.changeLight}></button>
            </div>
        );
    }
}