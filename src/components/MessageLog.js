import React from 'react';
import io from 'socket.io-client';

export default class MessageLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {log: ""};
        this.socket = this.props.socket;
        var nl = '\r\n';
        this.socket.on('printerFeed', (data) => {
            this.setState((state, props) => ({
                log: state.log.concat(data.concat(nl)) 
            }));
        });
    }

    render() {
        return (
            <section className="messageLog">
                <label>Log</label>
                <textarea rows="10">{this.state.log}</textarea>
            </section>
        );
    }

    
}