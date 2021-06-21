import React from 'react';
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
		this.initSockets = this.initSockets.bind(this);
	}

	componentDidMount() {
		this.getToken();
	}

	setToken(val){
		if(val){
			localStorage.setItem('userToken', JSON.stringify(val));
			this.setState({userToken: val});
			this.initSockets();
		}
	}

	initSockets() {
		if(!this.socket){
			console.log('no socket')
			this.socket = io({
				query: {
					token: this.state.userToken
				}
			});
			this.socket.on("initialSetup", (data) => {
				console.log("initialSetup")
				this.setState({data: data});
				console.log(data);
			});
		}
		
		this.socket.emit('dataRequest');
	}

	getToken() {
		var tokenStr = localStorage.getItem('userToken');
		if(tokenStr) {
			this.setToken(JSON.parse(tokenStr));
		}
	}

	logout() {
		this.setState({userToken: null});
		localStorage.removeItem('userToken');
		this.socket.disconnect();
	}

	componentWillUnmount() {
		this.socket.disconnect();
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
							<VideoStreaming socket={this.socket} />
						</div>
				}
				
			</div>
		);
	}
}