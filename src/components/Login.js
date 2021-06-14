import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {
            username: "",
            password: ""
        }
    }

    change(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }

    login() {
        this.socket.emit('authentication', this.state);
    }

    render() {
        return (			
        <div>
            <header className="login">
                <button>-+-</button>
            </header>
            <div className="loginPanel">
                <h1>¡Bienvenido!</h1>
                <div>
                    <label>Usuario:
                        <input type="text" name="username" placeholder="Usuario" value={this.state.username} onChange={this.change}/>
                    </label>
                    <label>Contraseña:
                        <input type="password" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.change}/>
                    </label>
                </div>
                <div>
                    <button onClick={this.login}>Entrar</button>
                </div>
            </div>
        </div>
        );
    }
}
