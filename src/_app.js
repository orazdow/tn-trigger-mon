import {createRoot} from 'react-dom/client';
import React, {useEffect, useRef} from 'react';
import Main from './main.js';
import "./css/normalize.css";
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/scss/variables.scss';
import './css/global.scss';

function App(props){
	const ref = useRef();
	useEffect(()=>{

		let svg = ref.current;

		document.addEventListener('keydown',(e)=>{
			switch(e.key){
				case 'c': svg.clear();
				break;
				case 'd': svg.addRect();
				break;
			}
		});

	},[]);

	return(
		<div className="main-view">
			<SVGtest width="50" height="50" ref={ref}/>
			{/*<Main/>*/}
		</div>
	);
} 

const root = createRoot(document.getElementById('root'));
root.render(<App/>);