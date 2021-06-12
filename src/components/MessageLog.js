import React from 'react';
import io from 'socket.io-client';
const MAX_LINES = 100;

export default class MessageLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {log: ""};
        this.socket = this.props.socket;
        var nl = '\r\n';
        this.textlines = [];
        this.socket.on('printerFeed', (data) => {
            this.textlines.push(data);
            if(this.textlines.length >= MAX_LINES){
                this.textlines.shift();
            }
            this.setState({log: this.textlines.join(nl)});
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