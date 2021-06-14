import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.setToken = props.setToken;
        this.state = {
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    change(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }



    handleSubmit(event) {
        event.preventDefault();
        this.setToken(await loginUser(this.state));
    }

    render() {
        return (			
        <div>
            <header className="login">
                <button>-+-</button>
            </header>
            <div className="loginPanel">
                <h1>¡Bienvenido!</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Usuario:
                        <input type="text" name="username" placeholder="Usuario" value={this.state.username} onChange={this.change}/>
                    </label>
                    <label>Contraseña:
                        <input type="password" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.change}/>
                    </label>
                    <div>
                        <button type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json());
}