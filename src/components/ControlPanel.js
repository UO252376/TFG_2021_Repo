import React from 'react';
import io from 'socket.io-client';
const MAX_LINES = 100;

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.socket = this.props.socket;
    }

    render() {
        return (
            <section className="controlPanel">
                <div><button>Pausa</button><button>Continuar</button></div>
                <div><button>Cancelar</button><button>Apagar</button></div>
            </section>
        );
    }


}