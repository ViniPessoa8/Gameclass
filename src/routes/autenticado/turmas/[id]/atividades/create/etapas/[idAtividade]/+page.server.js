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

		let data = await request.formData();

		console.log(`turmas/${params.id}/atividades/create/etapas/${params.idAtividade} actions default data: `, data)

		let etapas = data.get('etapas')

		let criterios
		let titulo
		let notaMax
		let dtEntregaMin
		let dtEntregaMax
		let atribuicaoNotas
		let realizacao
		let receberAposPrazo
		let idAtividadePai

		etapas.forEach((etapa) => {
			criterios = JSON.parse(etapa.criterios)
			titulo = etapa.titulo
			notaMax = parseFloat(etapa.notaMax)
			dtEntregaMin = new Date(etapa.dtEntregaMin)
			dtEntregaMax = new Date(etapa.dtEntregaMax)
			atribuicaoNotas = parseInt(etapa.atribuicaoNotas)
			realizacao = parseInt(etapa.realizacao)
			receberAposPrazo = Boolean(etapa.receberAposPrazo)
			idAtividadePai = parseInt(etapa.idAtividadePai)
		})

		console.log('titulo: ', titulo)
		console.log('notaMax: ', notaMax)
		console.log('dtEntregaMin: ', dtEntregaMin)
		console.log('dtEntregaMax: ', dtEntregaMax)
		console.log('atribuicaoNotas: ', atribuicaoNotas)
		console.log('realizacao: ', realizacao)
		console.log('receberAposPrazo: ', receberAposPrazo)
		console.log('idAtividadePai: ', idAtividadePai)

		let res = await cadastraItemAtividade(
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

		console.debug(res)

		// TODO: Cadastrar criterios

	}
}
