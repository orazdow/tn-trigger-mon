import res from '../res.json';

function testnum(){
	let s = String.fromCharCode(Math.random()*50+60);
	return {id:'888', tspeak: s+' has x = y', subject:s};
}

function testdata(name, n){
	let k = n||1;
	let t = [];
	for(let i = 0; i < k; i++)
		t.push(testnum());
	return {id: '888_'+name, name: name, truenumbers: t};
}

async function getTriggers() {
	let url = 'http://gov.truenumbers.com:8082/v1/trigger-definitions?status=ACTIVE';
	const response = await fetch(url,{headers:{'Accept': 'application/json'}});
	return await response.json();
}

export default function testEvent(cb){
	document.addEventListener('keydown',(e)=>{
		if(e.key == 't') cb(testdata('test', 1));
		else if(e.key == 'y') cb(testdata('test', 2));
		else if(e.key == 'u') cb(testdata('test', 4));
		else if(e.key == 'i') cb(testdata('test', 8));
		else if(e.key == 'g') cb(testdata('test_2', 1));
		else if(e.key == 'h') cb(testdata('test_2', 2));
		else if(e.key == 'j') cb(testdata('test_2', 4));
		else if(e.key == 'k') cb(testdata('test_2', 8));
		else if(e.key == 'w') cb(res);
		else{
			if(e.key == 'a'||e.key == 's'||e.key == 'd'||e.key == 'f'){
				cb(testdata('test'+e.key, 4));
			}
		}
		// else if(e.key == 'c'){
		// 	getTriggers().then((res)=>{
		// 		console.log(':', res);
		// 	});
		// }
	});
}