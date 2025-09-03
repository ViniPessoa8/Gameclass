export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export function formataData(data) {
	const dateOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timezone: 'America/Manaus'
	};

	let dataObj
	if (typeof data == "string") {
		dataObj = new Date(data)
	} else {
		dataObj = data

	}
	const dataStr = dataObj.toLocaleString('pt-BR', dateOptions);

	return dataStr

}
