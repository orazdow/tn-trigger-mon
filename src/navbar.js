import React from 'react';

export default function Navbar(props){
	return(
	<nav className="bp4-navbar bp4-dark" style={{padding:'0px'}}>
		<div className="navbar" style={{margin: '0 auto', width: props.width}}>
			<div className="bp4-navbar-group bp4-align-left">
			<div className="bp4-navbar-heading">Blueprint</div>
		</div>
			<div className="bp4-navbar-group bp4-align-right">
			<button className="bp4-button bp4-minimal bp4-icon-home">Home</button>
			<button className="bp4-button bp4-minimal bp4-icon-document">Files</button>
			<span className="bp4-navbar-divider"></span>
			<button className="bp4-button bp4-minimal bp4-icon-user"></button>
			<button className="bp4-button bp4-minimal bp4-icon-notifications"></button>
			<button className="bp4-button bp4-minimal bp4-icon-cog"></button>
		</div>
		</div>
	</nav>
	);
}