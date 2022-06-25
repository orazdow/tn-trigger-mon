function testnum(){
	let s = String.fromCharCode(Math.random()*50+60);
	return {id:'888', tspeak: s+' has x = y', subject:s};
}

function testdata(n){
	let k = n||1;
	let t = [];
	for(let i = 0; i < k; i++)
		t.push(testnum());
	return {id: '1234', name:'test', truenumbers: t};
}

export default function testEvent(cb){
	document.addEventListener('keydown',(e)=>{
		if(e.key == 't') cb(testdata());
		if(e.key == 'y') cb(testdata(4));
		if(e.key == 'u') cb(testdata(8));
	});
}