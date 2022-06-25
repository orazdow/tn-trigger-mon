import React, {useEffect} from 'react';

export default function Readout({data}){
	useEffect(()=>{
		if(data.id){
			console.log(data);
		}
	},[data]);
	return(
		<div></div>
	);
}
