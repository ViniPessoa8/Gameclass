
export function load({ data, params }) {
	console.debug("params ", params)
	return {
		...data,
		voltarPara: `/professor/turmas/${params.id}/atividades`
	};
}
