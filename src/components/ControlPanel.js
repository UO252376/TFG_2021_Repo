import React from 'react';
const MAX_LINES = 100;

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        this.cancel = this.cancel.bind(this);
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
                <div><button onClick={this.pause}>Pausa</button><button onClick={this.resume}>Continuar</button></div>
                <div><button onClick={this.cancel}>Cancelar</button><button onClick={this.shutDown}>Apagar</button></div>
            </section>
        );
    }


}