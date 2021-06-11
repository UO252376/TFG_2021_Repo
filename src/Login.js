class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (			
            <div>
                <header class="login">
                    <button>-+-</button>
                </header>
                <div class="loginPanel">
                    <h1>¡Bienvenido!</h1>
                    <div>
                        <label>Usuario:</label>
                        <input type="text"></input>
                        <label>Contraseña:</label>
                        <input type="password"></input>
                    </div>
                    <div>
                        <button onClick={this.tick}>Entrar</button>
                    </div>
                </div>
            </div>
        );
    }
}
