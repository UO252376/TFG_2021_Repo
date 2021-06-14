import React from 'react';
import io from 'socket.io-client';
import FilamentStatus from './components/FilamentStatus';
import MessageLog from './components/MessageLog';
import TempCanvas from './components/TempCanvas';
import ControlPanel from './components/ControlPanel';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.socket = io();

		// this.tick = this.tick.bind(this) if you use 'this' in function


	}

	componentDidMount() { // Set interval on mount if necesary

	}

	componentWillUnmount() { // Clear interval on unmount if set

	}

	tick() { // Function to call on intervall. Use setState to update components.
		// this.setState({var: newValue})
	}

	render() {
		return(
			<div>
			<header><h1>UO252376 - Controlador impresora</h1></header>
			<TempCanvas socket={this.socket}/>
			<FilamentStatus socket={this.socket} />
			<ControlPanel socket={this.socket} />
			<MessageLog socket={this.socket} />
			
			</div>
		);
	}
}