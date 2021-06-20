import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import FilamentStatus from './components/FilamentStatus';
import MessageLog from './components/MessageLog';
import TempCanvas from './components/TempCanvas';
import ControlPanel from './components/ControlPanel';
import Login from './components/Login';
import VideoStreaming from './components/VideoStreaming';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { userToken: null, data: null};
		this.setToken = this.setToken.bind(this);
		this.getToken = this.getToken.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		this.socket = io();
		this.getToken();
		this.socket.on("initialSetup", (data) => {
			console.log("initialSetup")
			this.setState({data: data});
			console.log(data);
		});
	}

	setToken(val){
		if(val){
			localStorage.setItem('userToken', JSON.stringify(val));
			this.setState({userToken: val});
		}
	}

	getToken() {
		var tokenStr = localStorage.getItem('userToken');
		if(tokenStr) this.setToken(JSON.parse(tokenStr));
	}

	logout() {
		this.setState({userToken: null});
		localStorage.removeItem('userToken');
	}

	render() {

		if(!this.state.userToken){
			return(
				<div className="wrapper">
					<header><h1>UO252376 - Controlador impresora</h1></header>
					<Login setToken={this.setToken}></Login>
				</div>
				);
		}
		return(
			<div className="wrapper">
				{!this.state.userToken ? 
					<div className="wrapper">
						<header><h1>UO252376 - Controlador impresora</h1></header>
						<Login setToken={this.setToken}></Login>
					</div>
					: this.state.data &&
						<div>
							<header><h1>UO252376 - Controlador impresora</h1><div><button onClick={this.logout}>Salir</button></div></header>
							<TempCanvas socket={this.socket}/>
							<FilamentStatus socket={this.socket} data={this.state.data}/>
							<ControlPanel socket={this.socket} />
							<MessageLog socket={this.socket} />
							<VideoStreaming />
						</div>
				}
				
			</div>
		);
	}
}