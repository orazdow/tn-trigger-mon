import React, {createRef} from 'react';
import { SVG } from '@svgdotjs/svg.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const bw = 5; 

const hoverstyle = {
	top: '-50px',
	left: '-50px',
	// backgroundColor: 'purple',
	position: 'absolute'
}

const menustyle = {
	textAlign:'left',
	justifyContent: 'start',
	lineHeight: '1rem',
	whiteSpace: 'pre',
	padding: '5px',
	width:'100%',
	height:'100%',
	cursor:'pointer',
	userSelect: 'none',
	borderRadius: '3px'
}

function numReport(data){
	let str = '';
	let d = data.truenumbers;
	if(!d) return str;
	str += d[0].tspeak;
	if(d.length > 1)
		str += ' (1 of '+d.length+')';
	return str;
}

class Bar extends React.Component {

	constructor(props) {
		super(props);
		this.w = props.width;
		this.h = props.height;
		this.init = this.init.bind(this);
		this.addRect = this.addRect.bind(this);
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
		let r = this.canvas.rect(bw, this.h).attr({ fill: '#f06' }).move(this.w,0);
		r.num = data;
		r.mouseover(()=>{this.hover(r, this.canvas.node)});
		r.animate(60000).ease('-').move(-bw,0);
	}

	hover(rect, svg){
		let p = new DOMPoint(rect.x(), rect.y());
        let c = p.matrixTransform(svg.getScreenCTM());
		let menu = this.menu.current;
		menu.style.top = c.y+'px';
		menu.style.left = c.x-1+'px';
		this.tref.current.innerHTML = numReport(rect.num);
		rect.stroke('#a06');
		menu.rect = rect;
	}

	menuleave(){
		let menu = this.menu.current;
		menu.style.top = '-50px';
		menu.style.left = '-50px';
		menu.rect.stroke('none');
	}

	menuclick(e){
		// this.menu.current.rect.stroke('#b06')
		console.log(this.menu.current.rect.num);
	}

	clear(){
		this.canvas.clear();
	}

	render(){
		return(
			<div>
			<li ref={this.init} style={this.css}>{this.props.data.name}</li>
			<Tippy 
				content={
					<div style={menustyle} 
						 className="ttip" 
						 ref={this.tref} 
						 onClick={this.menuclick}>
					</div>
				}
				placement='right-end'
				interactive={true}
				// delay={[0,200]}
				>
				<div ref={this.menu} 
					style={{width:bw+2+'px', height:this.h+'px',...hoverstyle}} 
					onMouseLeave={this.menuleave}>		
				</div>
			</Tippy>
			</div>
		);		
	}


}

export default Bar;