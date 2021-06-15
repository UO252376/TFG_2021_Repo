import React from 'react';
import io from 'socket.io-client';

export default class FilamentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filament : false};
        this.socket = this.props.socket;
        console.log(this.props.data);

        
        console.log("socket")
        console.log(this.socket)
        console.log("after mount");
        console.log(this.props.data);
        this.socket.on('filamentStatus', (data) => { // Function that changes color depending on limit switch state
            console.log("Socket event: filamentStatus " + data);
            this.setState({
                filament: data!=1
            });
        });
    }
    
    componentDidMount() {
    }

    render() {
        var isFilament = this.state.filament;
        return (
            <section className="filamentStatus">
                <div>
                    <h3>Filament status: 
                    {
                        isFilament ?
                        <span className="spanBox greenBox"></span>:

                        <span className="spanBox redBox"></span>
                    }
                    </h3>
                </div>
            </section>
        );
    }
}