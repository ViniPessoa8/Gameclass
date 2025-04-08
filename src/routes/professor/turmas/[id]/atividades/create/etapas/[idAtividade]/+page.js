export function load({ cookies, params }) {
	return {
		idAtividadePai: params.idAtividade,
		voltarPara: `/professor/turmas/${params.id}/atividades`
	}

}
