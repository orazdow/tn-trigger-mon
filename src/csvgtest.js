import React from 'react';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';


class Disp extends React.Component {

	constructor(props) {
		super(props);
		this.w = props.width;
		this.h = props.height;
		this.init = this.init.bind(this);
		this.addRect = this.addRect.bind(this);
	}

	init(node){
	    this.canvas = SVG().addTo(node).size(this.w, this.h);
	}

	addRect(){
		let r = this.canvas.rect(4, this.h).attr({ fill: '#f06' }).move(this.w,0);
		r.animate(30000).ease('-').move(-4,0);
	}

	clear(){
		this.canvas.clear();
	}

	render(){
		return(
			<div ref={this.init} style={{width: this.w, height: this.h}}></div>
		);		
	}


}

export default Disp;