import React from 'react';

export default class FilamentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filament : props.data.filament != 1};
    }
    
    componentDidMount() {
        this.props.socket.on('filamentStatus', (data) => { // Function that changes color depending on limit switch state
            console.log("Socket event: filamentStatus " + data);
            this.setState({
                filament: data!=1
            });
        });
    }

    render() {
        return (
            <section className="filamentStatus">
                <div>
                    <h3>Filament status: 
                    {
                        this.state.filament ?
                        <span className="spanBox greenBox"></span>:

                        <span className="spanBox redBox"></span>
                    }
                    </h3>
                </div>
            </section>
        );
    }
}