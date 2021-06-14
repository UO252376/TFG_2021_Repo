import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import FilamentStatus from './components/FilamentStatus';
import MessageLog from './components/MessageLog';
import TempCanvas from './components/TempCanvas';
import ControlPanel from './components/ControlPanel';
import Login from './components/Login';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.socket = io();

		var [token, setToken] = useState();
		this.token = token;
		this.setToken = setToken.bind(this);
		
	}

	render() {

		if(!this.token){
			return(
				<div className="wrapper">
					<header><h1>UO252376 - Controlador impresora</h1></header>
					<Login setToken={this.setToken}></Login>
				</div>
				);
		}
		return(
			<div className="wrapper">
				<header><h1>UO252376 - Controlador impresora</h1><button>Salir</button></header>
				<TempCanvas socket={this.socket}/>
				<FilamentStatus socket={this.socket} />
				<ControlPanel socket={this.socket} />
				<MessageLog socket={this.socket} />
			</div>
		);
	}
}