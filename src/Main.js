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
		this.state = { token: null}
		this.socket;
		this.setToken = this.setToken.bind(this);
		this.getToken = this.getToken.bind(this);
	}

	componentDidMount() {
		this.socket = io();
		this.getToken();
	}

	setToken(val){
		if(val){
			sessionStorage.setItem('token', JSON.stringify(val));
			this.setState({token: val});
		}
	}

	getToken() {
		var tokenStr = sessionStorage.getItem('token');
		if(tokenStr) this.setToken(JSON.parse(tokenStr));
	}

	render() {

		if(!this.state.token){
			return(
				<div className="wrapper">
					<header><h1>UO252376 - Controlador impresora</h1></header>
					<Login setToken={this.setToken}></Login>
				</div>
				);
		}
		return(
			<div className="wrapper">
				{!this.state.token ? 
					<div className="wrapper">
						<header><h1>UO252376 - Controlador impresora</h1></header>
						<Login setToken={this.setToken}></Login>
					</div>
					: 
					<div>
						<header><h1>UO252376 - Controlador impresora</h1><div><button>Salir</button></div></header>
						<TempCanvas socket={this.socket}/>
						<FilamentStatus socket={this.socket} />
						<ControlPanel socket={this.socket} />
						<MessageLog socket={this.socket} />
					</div>
				}
				
			</div>
		);
	}
}