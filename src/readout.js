import React, {useEffect} from 'react';
import { Button, Card, Elevation, Classes } from "@blueprintjs/core";

const outerstyle = {
	backgroundColor: '#383e47',
	padding:'5px 3px 5px 3px'

};

const innerstyle = {
	width: '100%',
	minHeight: '120px',
	backgroundColor: '#404854'

};

export default function Readout({data, cb}){
	useEffect(()=>{
		if(data.id){
			console.log(data);
		}
	},[data]);

	const closeData = ()=>{
		cb({});
	}

	return(	
		<Card style={innerstyle} className="bp4-navbar bp4-dark">
			<div className="bp4-navbar-group bp4-align-right">		
			<button className="bp4-button" 
					id="closebutton"
					onClick={closeData} 
					style={{outline:'none', borderRadius: '100%'}}>
					&#10799;
			</button>
		</div>		
		</Card>
	);
}
