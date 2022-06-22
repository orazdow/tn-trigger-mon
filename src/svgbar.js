import React, {createRef} from 'react';
import { SVG } from '@svgdotjs/svg.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 

const hoverstyle = {
	width: '20px',
	height: '80px',
	top: '-20px',
	left: '-20px',
	// opacity: '0',
	// backgroundColor: 'red',
	position: 'absolute'
}

const menustyle = {
	textAlign:'left',
	justifyContent: 'start',
	lineHeight: '.8rem',
	margin: '5px',
	width:'100%',
	height:'100%'
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
		this.menuleave = this.menuleave.bind(this);
		this.menuclick = this.menuclick.bind(this);
		this.css = {paddingLeft: '5px', width: this.w, height: this.h, ...this.props.style};
		this.menu = createRef();
		this.tref = createRef();
	}

	init(node){
		if(node){
			this.canvas = SVG().addTo(node).size(this.w, this.h);	
		}
	}

	addRect(data){
		let r = this.canvas.rect(4, this.h).attr({ fill: '#f06' }).move(this.w,0);
		r.num = data;
		r.mouseover(()=>{this.hover(r, this.canvas.node)});
		r.animate(60000).ease('-').move(-4,0);
	}

	hover(rect, svg){
		let p = new DOMPoint(rect.x(), rect.y());
        let c = p.matrixTransform(svg.getScreenCTM());
		let menu = this.menu.current;
		menu.style.top = c.y-20+'px';
		menu.style.left = c.x-10+'px';
		this.tref.current.innerHTML = (rect.num.truenumbers||[{}])[0].tspeak||'';
		rect.stroke('#b06')
		menu.rect = rect
	}

	menuleave(){
		let menu = this.menu.current;
		menu.style.top = '-20px';
		menu.style.left = '-20px';
		menu.rect.stroke('none')
	}

	menuclick(e){
		// this.menu.current.rect.stroke('#b06')
	}

	clear(){
		this.canvas.clear();
	}

	show(bool){
		this.element.style.visibility = bool ? 'visible' : 'hidden';
	}

	render(){
		return(
			<div>
			<li ref={this.init} style={this.css}>{this.props.data.name}</li>
			<Tippy 
				content={<div style={menustyle} ref={this.tref} onClick={this.menuclick}></div>}
				placement="right-end"
				interactive={true}>
				<div ref={this.menu} style={hoverstyle} onMouseLeave={this.menuleave}></div>
			</Tippy>
			</div>
		);		
	}


}

export default Bar;