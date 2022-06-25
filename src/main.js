import React, {useEffect, useRef, useState, forwardRef} from 'react';
import { Button, Card, Elevation, Classes } from "@blueprintjs/core";
import Navbar from './navbar.js';
import SVGbar from './svgbar.js';
import connect from './connect.js';
import testEvent from './test.js';

const map = {};

const SVGList = forwardRef((props, refList)=>{
	refList.current = [];

	const list = props.entries.map((e)=>{
		return <SVGbar  key={e[1].id} 
						data={e[1]}
						ref={(el) => refList.current.push(el)}
						width={props.width-14}
						height={props.height}/>
	});

	return( <div style={{padding: '.1rem', marginTop: '5px'}} className={Classes.LIST}>
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
		testEvent(dataCb);

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
		<SVGList width={800} height={65} entries={entries} ref={listref}/>
		</Card>	
		</div>

	);
}

export default Main;