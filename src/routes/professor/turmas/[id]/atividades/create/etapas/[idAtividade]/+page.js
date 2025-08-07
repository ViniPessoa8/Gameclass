export function load({ cookies, params, data}) {
	return {
		idAtividadePai: params.idAtividade,
		voltarPara: `/professor/turmas/${params.id}/atividades`,
		atividade: data.atividade
	}

}
