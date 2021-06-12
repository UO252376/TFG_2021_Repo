import React from 'react';
import io from 'socket.io-client';

export default class FilamentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filament : true};
        this.changeLight = this.changeLight.bind(this); // Button that changes light in raspberry
        this.socket = io();
        this.socket.on('light', (data) => { // Function that changes color depending on limit switch state
            this.setState({
                filament: data==1
            })
        })
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