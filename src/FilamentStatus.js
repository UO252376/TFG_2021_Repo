import React from 'react';
import io from 'socket.io-client';

export default class FilamentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filament : null};
        this.socket = io();
        this.socket.on('filamentStatus', (data) => { // Function that changes color depending on limit switch state
            this.setState({
                filament: data==1
            });
        });
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
            </div>
        );
    }
}