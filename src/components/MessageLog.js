import React from 'react';

export default class MessageLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {log: ""};
        this.socket = this.props.socket;
        var nl = '\r\n';
        this.MAX_LINES = 50;
        this.textlines = [];
    }

    componentDidMount() {
        this.socket.on('printerFeed', (data) => {
            console.log('printerFeed')
            console.log(data);
            this.textlines.push(data);
            if(this.textlines.length >= this.MAX_LINES){
                this.textlines.shift();
            }
            this.setState({log: this.textlines.join(nl)});
        });
    }

    render() {
        return (
            <section className="messageLog">
                <h3>Log</h3>
                <textarea disabled rows="10" value={this.state.log}></textarea>
            </section>
        );
    }


}