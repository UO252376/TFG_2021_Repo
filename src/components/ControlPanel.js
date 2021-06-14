import React from 'react';
import io from 'socket.io-client';
const MAX_LINES = 100;

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.socket = this.props.socket;
        this.shutDown = this.shutDown.bind(this)
    }

    shutDown() {
        this.socket.emit('shutdown', 1);
    }

    render() {
        return (
            <section className="controlPanel">
                <div><button>Pausa</button><button>Continuar</button></div>
                <div><button>Cancelar</button><button onClick={this.shutDown}>Apagar</button></div>
            </section>
        );
    }


}