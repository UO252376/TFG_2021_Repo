import React from 'react';

export default class FilamentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filament : this.props.filament != 1};
        this.socket = this.props.socket;
    }
    
    componentDidMount() {
        this.socket.on('filamentStatus', (data) => { // Function that changes color depending on limit switch state
            console.log("Socket event: filamentStatus " + data);
            this.setState({
                filament: data!=1
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
                        <span className="spanBox greenBox"></span>:

                        <span className="spanBox redBox"></span>
                    }
                    </h3>
                </div>
            </section>
        );
    }
}