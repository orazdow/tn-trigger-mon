import React, {useEffect, useState} from 'react';
import {Button, Card, MenuItem} from "@blueprintjs/core";
import {Select2} from "@blueprintjs/select";


const outerstyle = {
	width: '100%',
	minHeight: '120px',
	backgroundColor: '#404854'
};

const infostyle = {
	width: '100%', 
	float:'left',
	clear:'both'
};

function Info({tnumbers, triggers}){
	let numbers = tnumbers || [];
	let num = numbers[0];
	
	return num? (

		<div style={infostyle}> 
			{num.tspeak}
			{/*{triggers ? JSON.stringify(triggers,null,4):null}*/}
		</div>

	) : null;
}

export default function Readout({data, cb, getTriggers}){
	const[triggers, seTriggers] = useState(getTriggers());

	useEffect(()=>{
		if(data.id) console.log(data);
	},[data]);

	const closeData = ()=>{
		cb({});
	}

	return(	
		<Card style={outerstyle} className="bp4-navbar bp4-dark bp4-running-text">
			<div className="bp4-navbar-group bp4-align-right">	
			<button className="bp4-button" 
					onClick={closeData} 
					style={{outline:'none', borderRadius: '100%'}}>
					&#10799;
			</button>
			</div>		
			<Info tnumbers={data.truenumbers} triggers={triggers}/>
		</Card>
	);
}
