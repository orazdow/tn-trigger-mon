import React, {useEffect, useState} from 'react';
import {Button, Card} from "@blueprintjs/core";
import {Tab, Tabs} from "@blueprintjs/core";

const outerstyle = {
	width: '100%',
	minHeight: '120px',
	height: 'fit-content',
	paddingBottom: '20px',
	backgroundColor: '#404854'
};

const infostyle = {
	maxWidth:'340px',
	paddingLeft: '25px'
};

const ministyle = {
	ul:{
		overflow: 'hidden auto',
		maxWidth: '280px',
		width: '280px',
		maxHeight: '100px',
		boxSizing: 'border-box',
		border: '1px solid grey',
		margin:'6px',
		padding:'3px'
	},
	li:{
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	}
}

function TriggerView({tdata, triggerdata, w, h}){
	const res = triggerdata.triggerDefinitions.filter((el)=>{
		return el.name == tdata.name;
	});
	return(
		<div className="layout-row">
		<InfoTable numbers={res||[{}]} index={0} filter={triggerinfo} w={w} h={w} />
		</div>

	);
}

function triggerinfo(t){
	let o = {};
	if(t.id) o.id = t.id;
	if(t.status) o.status = t.status;
	if(t.name) o.name = t.name;
	if(t.numberspace) o.numberspace = t.numberspace;
	if(t.destinations) o.destinations = t.destinations.map(e => e.type).join(', ');
	if(t.tnql) o.tnql = t.tnql;
	if(t.description) o.description = t.description;
	return o;
}

function numinfo(num){
	let o = {};
	if(num._id) o._id = num._id;
	if(num.tspeak) o.tspeak = num.tspeak;
	if(num.subject) o.subject = num.subject;
	if(num.property) o.property = num.property;
	if(num.value) o.value = num.value.value;
	if(num.tags) o.tags = num.tags.map(e => e.srd).join(', ');
	if(num.agent) o.dateCreated = num.agent.dateCreated;
	return o;
}

function InfoTable({numbers, index, filter, w, h}){
	let idx = (index >= numbers.length) ? 0 : index;
	let num = numbers[idx];
	let entries = Object.entries(filter(num));

	let rows = entries.map((e, i)=>{
		return (
			<tr key={'_'+i}>
			<td className="td-left">
				<div>{e[0]}</div>
			</td>
			<td className="td-right">
				<div>{e[1]}</div>
			</td>
			</tr>
			)
	});

	return (
		<div className="bp4-menu infotable">
		<table className="bp4-html-table-condensed">
			<tbody >{rows}</tbody>
		</table>
		</div>
	);
}

function SelectList({arr, field, label, w, h}){
	const [idx, setIdx] = useState(0);

	const onclick = (e)=>{
		setIdx(e.target.value||0);
	}

	useEffect(()=>{
		setIdx(0)
	},[arr]);

	const un = "bp4-menu-item bp4-fill bp4-text-overflow-ellipsis";
	const sel = "bp4-menu-item bp4-fill bp4-text-overflow-ellipsis bp4-selected";

	const list = arr.map((el, i)=>{
    	return(
	    	<li key={'_'+i} value={i}  onClick={onclick} className={i==idx? sel:un}>
	    		{label?<span className="bp4-menu-item-label">{i+''}&nbsp;</span>:null}
				{el[field]}
	        </li>
        );
	});

	return(
	<div className="layout-row">
	<div className="bp4-popover2-content bplist" style={{width:w+'px', height:h+'px'}}>
		<ul role="listbox" id="listbox-3" className="bp4-menu ">
		{list}
		</ul>
	</div>
	<InfoTable numbers={arr} index={idx} filter={numinfo} w={w} h={w} />
	</div>
	);
}

function Menu({tdata, triggers}){
	const [activeTab, setactiveTab] = useState('a');
	const [idx, setIdx] = useState(0);

	const tabchange = (tab)=>{
		setactiveTab(tab);
	}

	return(
		<Tabs animate={false} onChange={tabchange} selectedTabId={activeTab}>
		    <Tab id="a" title="numbers" panel={
		    	<SelectList arr={tdata.truenumbers} field="tspeak" w={280} h={180}/>   	
		    } />
		    <Tab id="b" title="trigger" panel={
		    	<TriggerView tdata={tdata} triggerdata={triggers} w={500} h={350}/>
		    } />
		</Tabs>
	)
}

export default function Readout({data, cb, getTriggers}){
	const[triggers, setTriggers] = useState(getTriggers());
	const[numberdata, setNumbers] = useState(data);

	useEffect(()=>{
		if(data.id){
			 console.log(data);
			 setNumbers(data);
		}
	},[data]);

	const closeData = ()=>{
		cb({});
	}

	return(	
		<Card style={outerstyle} className="bp4-navbar bp4-dark">
			<div className="bp4-navbar-group bp4-align-right">	
			<button className="bp4-button" 
					onClick={closeData} 
					style={{outline:'none', borderRadius: '100%'}}>
					&#10799;
			</button>
			</div>		
			<Menu tdata={numberdata} triggers={triggers}/>
		</Card>
	);
}
