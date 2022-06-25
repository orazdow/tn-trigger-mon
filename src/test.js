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

export default function testEvent(cb){
	document.addEventListener('keydown',(e)=>{
		if(e.key == 't') cb(testdata('test', 1));
		else if(e.key == 'y') cb(testdata('test', 2));
		else if(e.key == 'u') cb(testdata('test', 4));
		else if(e.key == 'i') cb(testdata('test', 8));
		// else{
		// 	let k = e.key.charCodeAt(0);
		// 	if( k > 96 && k < 123){
		// 		cb(testdata('test'+e.key, 4));
		// 	}
		// }

		// if(e.key == 'g') cb(testdata('test_2', 1));
		// if(e.key == 'h') cb(testdata('test_2', 2));
		// if(e.key == 'j') cb(testdata('test_2', 4));
		// if(e.key == 'k') cb(testdata('test_2', 8));

		// if(e.key == 'b') cb(testdata('test_3', 1));
		// if(e.key == 'n') cb(testdata('test_3', 2));
		// if(e.key == 'm') cb(testdata('test_3', 4));
		// if(e.key == ',') cb(testdata('test_3', 8));

	});
}