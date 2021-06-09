import React from 'react';
export default function Main () {
  return (
		<div>
		<header><button>-+-</button></header>
			<h1>¡Bienvenido!</h1>
			<div>
				<label>Usuario:</label>
				<input type="text"></input>
				<label>Contraseña:</label>
				<input type="password"></input>
			</div>
			<div>
				<button>Entrar</button>
			</div>
		</div>
	)
}
