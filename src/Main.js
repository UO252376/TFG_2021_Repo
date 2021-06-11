import React from 'react';
import FilamentStatus from './FilamentStatus';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

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
			<header><h1>Información general</h1></header>
				<FilamentStatus />
			</div>
		);
	}
}