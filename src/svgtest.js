import React, {useCallback, useState} from 'react';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';


function initDraw(element, w, h) {
	var draw = SVG().addTo(element).size(w, h);
	var rect = draw.rect(100, 100).attr({ fill: '#f06' });
	return draw;	
}

function Disp({width, height}){

  const [canvas, setCanvas] = useState(undefined);

	const init = useCallback((node) => {
		let pxw = window.innerWidth*width / 100;
		let pxh = window.innerHeight*height / 100;
	    let c = initDraw(node, pxw, pxh);
	    setCanvas(c);
	  },[]);

	return(

		<div className="ui">    
		<div className="svgtest" ref={init} style={{width: width+'vw', height: height+'vh'}}>
		{/*svg*/}
		</div>
		</div>

	);

}

export default Disp;