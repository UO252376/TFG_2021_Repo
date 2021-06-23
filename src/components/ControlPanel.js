import React from 'react';
const MAX_LINES = 100;

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.pause = this.pause.bind(this);

        this.shutDown = this.shutDown.bind(this);
    }

    componentDidMount() {
    }

    pause() {
        this.props.socket.emit('pausePrint');
    }

    resume() {
        this.props.socket.emit('resumePrint');
    }

    cancel(){
        this.props.socket.emit('cancelPrint');
    }

    shutDown() {
        console.log("Lanzando shutdown");
        this.props.socket.emit('shutdown');
    }

    render() {
        return (
            <section className="controlPanel">
                <div><button onClick={}>Pausa</button><button onClick={}>Continuar</button></div>
                <div><button onClick={}>Cancelar</button><button onClick={this.shutDown}>Apagar</button></div>
            </section>
        );
    }


}