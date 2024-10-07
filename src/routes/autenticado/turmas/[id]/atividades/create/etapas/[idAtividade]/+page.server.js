import { redirect } from "@sveltejs/kit"
import { cadastraItemAtividade } from '$controllers/itemAtividade.js';


export async function load({ params }) {
	console.log(`turmas/${params.id}/atividades/create/etapas/${params.idAtividade} load()`)
	// redirect(307, "/autenticado/turmas/" + params.id + "/atividades/create/etapas/" + params.idAtividade + "/")
}


export let actions = {
	default: async ({ cookies, params, request }) => {
		let idUsuario = JSON.parse(await cookies.get("session"));
		idUsuario = idUsuario.id

		let idAtividade = params.idAtividade

		let data = await request.formData();

		console.log(`turmas/${params.id}/atividades/create/etapas/${params.idAtividade} actions default data: `, data)

		let criterios = JSON.parse(data.get('criterios'))

		let titulo = data.get('titulo')
		let notaMax = parseFloat(data.get('notaMax'))
		let dtEntregaMin = new Date(data.get('dtEntregaMin'))
		let dtEntregaMax = new Date(data.get('dtEntregaMax'))
		let atribuicaoNotas = parseInt(data.get('atribuicaoNotas'))
		let realizacao = parseInt(data.get('realizacao'))
		let receberAposPrazo = Boolean(data.get('receberAposPrazo'))
		let idAtividadePai = parseInt(data.get('idAtividadePai'))

		console.log('titulo: ', titulo)
		console.log('notaMax: ', notaMax)
		console.log('dtEntregaMin: ', dtEntregaMin)
		console.log('dtEntregaMax: ', dtEntregaMax)
		console.log('atribuicaoNotas: ', atribuicaoNotas)
		console.log('realizacao: ', realizacao)
		console.log('receberAposPrazo: ', receberAposPrazo)
		console.log('idAtividadePai: ', idAtividadePai)

		await cadastraItemAtividade(
			titulo,
			notaMax,
			dtEntregaMin,
			dtEntregaMax,
			atribuicaoNotas,
			realizacao,
			receberAposPrazo,
			0,
			0,
			idAtividadePai
		);

		// TODO: Cadastrar criterios

	}
}
