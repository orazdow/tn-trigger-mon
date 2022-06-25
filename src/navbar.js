import React from 'react';

export default function Navbar(props){
	return(
	<nav className="bp4-navbar bp4-dark" style={{padding:'0px'}}>
		<div className="navbar" style={{margin: '0 auto', width: props.width}}>
			<div className="bp4-navbar-group bp4-align-left">
			{/*<div className="bp4-navbar-heading">Blueprint</div>*/}
			<img src="c2xLogo.png" width="65px"></img>
			<span className="bp4-navbar-divider"></span>
		</div>
		<div className="bp4-navbar-group bp4-align-right">
			{/*<span className="bp4-navbar-divider"></span>*/}
			<button className="bp4-button " id="clearbutton" style={{outline:'none'}}>clear</button>
		</div>
		</div>
	</nav>
	);
}