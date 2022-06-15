import React, {forwardRef} from 'react';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 

const hoverstyle = {
	width: '20px',
	height: '80px',
	opacity: '0',
	position: 'absolute'
}

const menustyle = {
	textAlign:'left',
	justifyContent: 'start',
	lineHeight: '.8rem',
	margin: '5px'
}

class Bar extends React.Component {

	constructor(props) {
		super(props);
		this.w = props.width;
		this.h = props.height;
		this.init = this.init.bind(this);
		this.addRect = this.addRect.bind(this);
		this.show = this.show.bind(this);
		this.hover = this.hover.bind(this);
		this.css = {paddingLeft: '5px',width: this.w, height: this.h, ...this.props.style};
		this.menu = React.createRef();
	}

	init(node){
		if(node){
			this.canvas = SVG().addTo(node).size(this.w, this.h);
		    this.top = node.getBoundingClientRect().y;
		    this.left = node.getBoundingClientRect().x;
		    this.element = node;		
		}
	}

	addRect(){
		let r = this.canvas.rect(4, this.h).attr({ fill: '#f06' }).move(this.w,0);
		r.mouseover(()=>{this.hover(r, this.canvas.node)});
		r.animate(30000).ease('-').move(-4,0);
	}

	hover(rect, svg){
		let p = new DOMPoint(rect.x(), rect.y());
        let c = p.matrixTransform(svg.getScreenCTM());
		let menu = this.menu.current;
		menu.style.top = c.y-20+'px';
		menu.style.left = c.x-10+'px';
	}

	clear(){
		this.canvas.clear();
	}

	show(bool){
		this.element.style.visibility = bool ? 'visible' : 'hidden';
	}

	render(){
		let n = this.props.data.truenumbers[0];
		return(
			<div>
			<li ref={this.init} style={this.css}>{this.props.data.name}</li>
			<Tippy 
				content={<div style={menustyle}>{n.tspeak}</div>}
				placement="right">
				<div ref={this.menu} style={hoverstyle}></div>
			</Tippy>
			</div>
		);		
	}


}

export default Bar;