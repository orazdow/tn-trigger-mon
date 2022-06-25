import {createRoot} from 'react-dom/client';
import React, {useEffect, useRef} from 'react';
import { FocusStyleManager } from "@blueprintjs/core";
import Main from './main.js';
import "./css/normalize.css";
import '@blueprintjs/core/lib/css/blueprint.css';
import './css/global.scss';

FocusStyleManager.onlyShowFocusOnTabs();

function App(props){

	return(
		<div className="main-view">
			<Main/>
		</div>
	);
} 

const root = createRoot(document.getElementById('root'));
root.render(<App/>);