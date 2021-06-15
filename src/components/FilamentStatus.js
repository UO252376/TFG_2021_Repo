import React from 'react';
import io from 'socket.io-client';

export default class FilamentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filament : props.data.filament==1};
        this.socket = this.props.socket;
    }
    
    componentDidMount() {
        this.socket.on('filamentStatus', (data) => { // Function that changes color depending on limit switch state
            console.log("Socket event: filamentStatus " + data);
            this.setState({
                filament: data==1
            });
        });
    }

    render() {
        var isFilament = this.state.filament;
        return (
            <section className="filamentStatus">
                <div>
                    <h3>Filament status: 
                    {
                        isFilament ?
                        <span className="spanBox redBox"></span> :
                        <span className="spanBox greenBox"></span>
                    }
                    </h3>
                </div>
            </section>
        );
    }
}