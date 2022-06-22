import React, {useEffect, useRef, useState, forwardRef} from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Classes } from "@blueprintjs/core";
import Navbar from './navbar.js';
import connect from './connect.js';
import SVGbar from './svgbar.js';

const map = {};

function testdata(){
	return {id: '1234', name:'test', 
	truenumbers: [{	id: '888', 
					tspeak: String.fromCharCode(Math.random()*50+50), 
					subject:'...'}]
	};
}

const SVGList = forwardRef((props, refList)=>{
	refList.current = [];

	const list = props.entries.map((el)=>{
		return <SVGbar  key={el[1].id} 
						data={el[1]}
						ref={(el) => refList.current.push(el)}
						width="800" 
						height="60" 
						style={{borderBottom:'1px solid black'}}/>
	});

	return( <div style={{padding: '.1rem'}} className={Classes.LIST}>
			<ul>{list}</ul>
			</div>
	);
})

function dispatchDisplay(reflist){
	for(let el of reflist.current){
		if(el && el.props.data.dispatch){
			el.addRect(el.props.data);
		}	
	}
	for(let key in map){
		map[key].dispatch = false;
	}
}

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

		document.addEventListener('keydown',(e)=>{
			if(e.key == 't') dataCb(testdata());
		});

		document.querySelector('#clearbutton').onclick = (e)=>{
			for(let key in map){
				delete map[key];
			}
			setEntries(Object.entries(map));
		}
	},[]);

	useEffect(()=>{
		dispatchDisplay(listref);	
	},[entries]);


	return(

		<div className="ui">    
		<div className="spacer"></div>
		<Card interactive={false} elevation={Elevation.TWO} style={{padding: '0px', minHeight:'30vh'}}>		
		<Navbar width="800px"/>
		<SVGList entries={entries} ref={listref}/>
		</Card>	
		</div>

	);
}

export default Main;