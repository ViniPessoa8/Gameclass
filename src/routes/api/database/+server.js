export function GET(){
	console.log("/database GET")
	let options = {
		status: 200
	}

	return new Response("/database GET", options)
}
