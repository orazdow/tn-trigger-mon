import {io} from "socket.io-client";

const url = 'ws://gov.truenumbers.com:8082';
var socket;

const options = {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

export default function connect(cb){
	socket = io(url, options);

	socket.on('connect', () => {
	  console.log('connected');
	});

	socket.on("trigger:all", (data) => {
	  cb(data);
	});
}

export async function getTriggers(){
	let url = 'http://gov.truenumbers.com:8082/v1/trigger-definitions?status=ACTIVE';
	const response = await fetch(url,{headers:{'Accept': 'application/json'}});
	return await response.json();
}
