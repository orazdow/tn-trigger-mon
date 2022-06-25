import React, {useEffect, useRef, useState, forwardRef} from 'react';
import { Button, Card, Elevation, Classes } from "@blueprintjs/core";
import Navbar from './navbar.js';
import SVGbar from './svgbar.js';
import connect, {getTriggers} from './connect.js';
import testEvent from './test.js';
import Readout from './readout.js';

const map = {};
const glob = {
	triggers: undefined,
	listlen: 0
};

const SVGList = forwardRef((props, refList)=>{
	refList.current = [];
	const list = props.entries.map((e)=>{
		return <SVGbar  key={e[1].id} 
						data={e[1]}
						ref={(el) => refList.current.push(el)}
						cb={props.cb}
						width={props.width-14}
						height={props.height}/>
	});

	return( 
		<div style={{padding: '.1rem', 
					marginTop: '5px', 
					marginBottom: '4px',
					maxHeight: '400px', 
					overflow: 'hidden auto'}} 
			className={Classes.LIST}>
			<ul>{list}</ul>
		</div>
	);
})

function dispatchDisplay(reflist){
	for(let el of reflist.current){
		if(el && el.props.data.dispatch)
			el.addRect(el.props.data);			
	}
	for(let key in map){
		map[key].dispatch = false;
	}
}

function Main(){
	const listref = useRef([]);
	const [entries, setEntries] = useState(Object.entries(map));
	const [readoutData, setreadoutData] = useState({});

	const dataCb = (data)=>{
		data.dispatch = true
		map[data.name] = data;
		setEntries(Object.entries(map));
	};

	const readoutCb = (data)=>{
		setreadoutData(data);
	};

	useEffect(()=>{
		dispatchDisplay(listref);	
		if(entries.length != glob.listlen){
			glob.listlen = entries.length;
			if(glob.listlen)
			getTriggers().then((res)=>{
					glob.triggers = res;
					console.log(res);
			});
		}
	},[entries]);

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

	return(

		<div className="ui">    
			<div className="spacer"></div>
			<div 	className="bp4-card bp4-elevation-2"
					style={{padding: '0px', minHeight:'30vh'}}>		
				<Navbar width="800px"/>
				<SVGList width={800} height={65} entries={entries} ref={listref} cb={readoutCb}/>
				{readoutData.id ? 
					<Readout data={readoutData} cb={readoutCb} getTriggers={()=>glob.triggers}/> 
					: null
				}
			</div>	
		</div>

	);
}

export default Main;