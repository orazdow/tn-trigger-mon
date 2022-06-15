import React, {useEffect, useRef, useState, forwardRef} from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Classes } from "@blueprintjs/core";
import Navbar from './navbar.js';
import connect from './connect.js';
import SVGbar from './svgbar.js';

const map = {};

const SVGList = forwardRef((props, refList) =>{
	refList.current = [];

	const list = props.entries.map((el) => {
		return <SVGbar  key={el[1].id} 
						data={el[1]}
						ref={(el) => refList.current.push(el)}
						width="600" 
						height="50" 
						style={{borderBottom:'1px solid black'}}/>
	});

	return( <div style={{padding: '.1rem'}} className={Classes.LIST}>
			<ul>{list}</ul>
			</div>
		);
});

const dispatchDisplay = (reflist, postcb)=>{
	for(let el of reflist.current){
		if(el){
			if(el.props.data.dispatch){
				el.addRect();
			}
		}
	}
	postcb();
};

function Main(){

	const listref = useRef([]);
	const [entries, setEntries] = useState(Object.entries(map));

	const dataCb = (data)=>{
		data.dispatch = true
		map[data.name] = data;
		setEntries(Object.entries(map));
	};

	useEffect(()=>{
		connect(dataCb);
	},[]);

	useEffect(()=>{
		dispatchDisplay(listref,()=>{
			for(let key in map){
				map[key].dispatch = false;
			}	
		});	
	},[entries]);


	return(

		<div className="ui">    
		<div className="spacer"></div>
		<Card interactive={false} elevation={Elevation.TWO} style={{padding: '0px', minHeight:'20vh'}}>		
		<Navbar width="600px"/>
		<SVGList entries={entries} ref={listref}/>
		</Card>	
		</div>

	);
}

export default Main;