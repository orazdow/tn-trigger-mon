import {createRoot} from 'react-dom/client';
import React, {useEffect, useRef} from 'react';
import Main from './main.js';
import "./css/normalize.css";
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/scss/variables.scss';
import './css/global.scss';

function App(props){

	return(
		<div className="main-view">
			<Main/>
		</div>
	);
} 

const root = createRoot(document.getElementById('root'));
root.render(<App/>);