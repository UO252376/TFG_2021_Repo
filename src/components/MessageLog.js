import React from 'react';
import io from 'socket.io-client';
const MAX_LINES = 100;

export default class MessageLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {log: ""};
        this.props.textlines = [];
        this.socket = this.props.socket;
        var nl = '\r\n';
        this.socket.on('printerFeed', (data) => {
            this.props.textlines.push(data);
            if(this.props.textlines.length >= MAX_LINES){
                this.props.textlines.shift();
            }
            this.setState((state, props) => ({
                log: props.textlines.join(nl)
            }));
        });
    }

    render() {
        return (
            <section className="messageLog">
                <label>Log</label>
                <textarea disabled rows="10">{this.state.log}</textarea>
            </section>
        );
    }


}