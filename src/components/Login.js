import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.change = this.change.bind(this);
    }

    change(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }



    async handleSubmit(event) {
        event.preventDefault();
        await loginUser(this.state).then((resp) => {
            console.log(resp);
            this.props.setToken(resp);
            console.log(resp);
        });
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
    var response = fetch('http://192.168.1.21/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then((resp) => {
        console.log(resp.json());
        return resp.json();
    });
    return response;
}