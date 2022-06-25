import React, {createRef} from 'react';
import {SVG} from '@svgdotjs/svg.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const bw = 5; 

const hoverstyle = {
	top: '-250px',
	left: '-250px',
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

const labelstyle = {
	position:'absolute', 
	fontSize: '14px',
	fontFamily: 'monospace',
	fontWeight: '500',
	backgroundColor:'#dadada72',
	height:'17px',
	paddingLeft:'2px',
	paddingRight:'2px'
};

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
		this.css = {position: 'relative',
					paddingLeft: '5px',
					paddingRight: '5px',
					borderBottom:'1px solid black'};
		this.menu = createRef();
		this.tref = createRef();
	}

	init(node){
		if(node){
			this.canvas = SVG().addTo(node).size(this.w, this.h);	
			this.canvas.css({'padding-left':'1px','padding-right':'1px'});
		}
	}

	addRect(data){
		let g = this.canvas.group();
		let r = g.rect(bw, this.h).attr({fill: '#f06'}).move(this.w,0);
		r.num = data;
		let n = (data.truenumbers||[{}]).length;
		if(n > 1){
        	let h = this.h*.1*Math.min(n, 10);
			g.rect(bw*.5, h).attr({fill: '#a00'}).move(this.w, this.h-h);
		}
		g.mouseover(()=>{this.hover(r, this.canvas.node)});
		g.animate(60000).ease('-').move(-bw-1, 0);
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
		menu.style.top = '-250px';
		menu.style.left = '-250px';
		menu.rect.stroke('none');
	}

	menuclick(e){
		this.props.cb(this.menu.current.rect.num);
	}

	clear(){
		this.canvas.clear();
	}

	render(){
		return(
			<div>
			<li ref={this.init} style={this.css}>
				<div style={{top: this.h-10+'px', ...labelstyle}}>
					{this.props.data.name}
				</div>	
			</li>
			<Tippy 
				placement='right-end'
				interactive={true}
				content={
					<div style={menustyle} 
						 className="ttip" 
						 ref={this.tref} 
						 onClick={this.menuclick}>
					</div>
				}>
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