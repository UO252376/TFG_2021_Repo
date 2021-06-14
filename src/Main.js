import React from 'react';
import io from 'socket.io-client';
import FilamentStatus from './components/FilamentStatus';
import MessageLog from './components/MessageLog';
import TempCanvas from './components/TempCanvas';
import ControlPanel from './components/ControlPanel';
import Login from './components/Login';
var relay = new Gpio(18, 'low');


export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {login: false};
		this.socket = io();

		this.socket.on('loginResponse', (data) => {
			this.setState({
				login: data.login
			});
		});
	}

	render() {
		return(
		<div className="wrapper">
			<BrowserRouter>
				<Switch>
					<Route path="/login">
						<header><h1>UO252376 - Controlador impresora</h1></header>
						<Login></Login>
					</Route>
					<Route path="/dashboard">
						<header><h1>UO252376 - Controlador impresora</h1><button>Salir</button></header>
						<TempCanvas socket={this.socket}/>
						<FilamentStatus socket={this.socket} />
						<ControlPanel socket={this.socket} />
						<MessageLog socket={this.socket} />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
		);
	}
}