import React from 'react';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';


class Bar extends React.Component {

	constructor(props) {
		super(props);
		this.w = props.width;
		this.h = props.height;
		this.init = this.init.bind(this);
		this.addRect = this.addRect.bind(this);
		this.show = this.show.bind(this);
		this.css = {paddingLeft: '5px',width: this.w, height: this.h, ...this.props.style};
		this.label = '';
	}

	init(node){
		if(node){
			this.canvas = SVG().addTo(node).size(this.w, this.h);
		    this.element = node;		
		}else{
			console.log('node null');
		}

	}

	addRect(){
		let r = this.canvas.rect(4, this.h).attr({ fill: '#f06' }).move(this.w,0);
		r.animate(30000).ease('-').move(-4,0);
	}

	clear(){
		this.canvas.clear();
	}

	show(bool){
		this.element.style.visibility = bool ? 'visible' : 'hidden';
	}

	render(){
		return(
			<li ref={this.init} style={this.css}>{this.props.data.name}</li>
		);		
	}


}

export default Bar;