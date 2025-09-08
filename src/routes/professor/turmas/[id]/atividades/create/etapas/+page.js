export function load({ params, data }) {
	return {
		idAtividadePai: params.idAtividade,
		atividade: data.atividade
	}
}
