export function load({ params, data }) {
	return {
		idAtividadePai: params.idAtividade,
		...data
	}
}
