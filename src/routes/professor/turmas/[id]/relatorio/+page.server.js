import AtividadeController from "$lib/server/controllers/atividade"
import ItemAtividadeController from "$lib/server/controllers/itemAtividade"
import EntregaController from "$lib/server/controllers/entrega"
import TurmaController from "$lib/server/controllers/turma"
import Turma from "$lib/models/Turma"

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const entregaController = new EntregaController()
const turmaController = new TurmaController()

export async function load({ params, cookies }) {
	let data = {}
	const idTurma = params['id']

	// ----- CARREGA DADOS DO BANCO ----- //

	// Info da turma
	data.turma = new Turma(await turmaController.buscaPorId(idTurma)).toObject()

	// Atividades da turma
	let atividades = await atividadeController.listaPorIdTurma(idTurma);
	data.atividades = atividades.map((e) => e.toObject())

	// Itens de Atividade
	for (const [indexA, atividade] of atividades.entries()) {
		let itensAtividade = await itemAtividadeController.listaItensDaAtividadePorId(atividade.id);
		itensAtividade = itensAtividade.map((e) => e.toObject())

		// Entregas
		for (const [indexIA, itemAtividade] of itensAtividade.entries()) {
			itensAtividade[indexIA].entregas = await entregaController.listaPorItemAtividade(itemAtividade.id);

			// Notas da entrega
			for (const [indexE, entrega] of itensAtividade[indexIA].entregas.entries()) {
				itensAtividade[indexIA].entregas[indexE].notas = await entregaController.listaNotasObtidasDeCriterios(entrega.id)
			}
		}
		data.atividades[indexA].itensAtividade = itensAtividade
	}

	data.estudantes = await turmaController.listaAlunos(idTurma);

	// ----- CALCULA ESTATISTICAS ----- // 

	// Média da turma
	//
	// Entregas de cada atividade
	const notasTurma = data.atividades
		.flatMap((atividade) => atividade.itensAtividade)
		.flatMap((itemAtividade) => itemAtividade.entregas)
		.flatMap((entrega) => entrega.notas)

	// Soma das notas da turma
	const somaNotasTurma = notasTurma.reduce((acc, nota) => acc = acc + nota.nota_atribuida, 0)
	data.somaNotasTurma = somaNotasTurma

	// Total de entregas da turma
	const totalEntregasTurma = notasTurma.length
	data.totalEntregasTurma = totalEntregasTurma

	// Média de notas da turma
	data.mediaTurma = data.totalEntregasTurma != 0 ? somaNotasTurma / totalEntregasTurma : 0.0

	// Menor nota da turma
	const notasAtribuidas = notasTurma.flatMap((nota) => nota.nota_atribuida)
	data.menorNota = notasTurma.length != 0 ? Math.min(...notasAtribuidas) : 0.0

	for (const [indexA, atividade] of data.atividades.entries()) {
		console.debug("\n[Calculando estatísticas] Atividade ", atividade.id)

		// Nota total de cada atividade
		const somaNotas = atividade.itensAtividade
			.flatMap((itemAtividade) => itemAtividade.entregas)
			.flatMap((entrega) => entrega.notas)
			.reduce((total, n) => total + (n.pontuacao_max ?? 0), 0); // inicia em 0
		data.atividades[indexA].notaMax = parseFloat(somaNotas)

		// Soma de notas obtidas de cada atividade
		const somaNotasObtidas = atividade.itensAtividade
			.flatMap((itemAtividade) => itemAtividade.entregas)
			.flatMap((entrega) => entrega.notas)
			.reduce((total, n) => total + (n.nota_atribuida ?? 0), 0); // inicia em 0
		data.atividades[indexA].somaNotasObtidas = parseFloat(somaNotasObtidas)

		const notas = atividade.itensAtividade
			.flatMap((i) => i.entregas)
			.flatMap((e) => e.notas)
			.flatMap((n) => n.nota_atribuida)

		// Média de notas de cada atividade
		const mediaNotas = notas.length != 0 ? somaNotasObtidas / notas.length : 0.0;
		data.atividades[indexA].mediaNotas = parseFloat(mediaNotas)

		// Nota máxima de cada atividade
		const notaMaxObtida = Math.max(...notas);
		data.atividades[indexA].notaMaxObtida = parseFloat(notaMaxObtida)

		// Nota mínima de cada atividade
		const notaMinObtida = Math.min(...notas);
		data.atividades[indexA].notaMinObtida = parseFloat(notaMinObtida)

		// Entregas de cada atividade
		const totalEntregas = data.estudantes.length * atividade.itensAtividade.length
		data.atividades[indexA].totalEntregas = parseFloat(totalEntregas)

		const totalEntregasRealizadas = atividade.itensAtividade
			.flatMap((itemAtividade) => itemAtividade.entregas)
			.flatMap((entrega) => entrega)
			.length
		data.atividades[indexA].totalEntregasRealizadas = parseFloat(totalEntregasRealizadas)

		// Pega as mesmas estatístas acima, porém para cada Item de Atividade
		for (const [indexIA, itemAtividade] of data.atividades[indexA].itensAtividade.entries()) {

			data.atividades[indexA].itensAtividade[indexIA]

			// Nota total de cada atividade
			const somaNotas = itemAtividade.entregas
				.flatMap((entrega) => entrega.notas)
				.reduce((total, n) => total + (n.pontuacao_max ?? 0), 0); // inicia em 0
			data.atividades[indexA].itensAtividade[indexIA].notaMax = parseFloat(somaNotas)

			const somaNotasObtidas = itemAtividade.entregas
				.flatMap((entrega) => entrega.notas)
				.reduce((total, n) => total + (n.nota_atribuida ?? 0), 0); // inicia em 0
			data.atividades[indexA].itensAtividade[indexIA].somaNotasObtidas = parseFloat(somaNotasObtidas)

			const notas = itemAtividade.entregas
				.flatMap((e) => e.notas)
				.flatMap((n) => n.nota_atribuida)

			// Média de notas de cada Item da atividade
			const mediaNotas = notas.length != 0 ? somaNotasObtidas / notas.length : 0.0;
			data.atividades[indexA].itensAtividade[indexIA].mediaNotas = parseFloat(mediaNotas)

			// Nota máxima de cada atividade
			const notaMaxObtida = notas.length != 0 ? Math.max(...notas) : 0.0;
			data.atividades[indexA].itensAtividade[indexIA].notaMaxObtida = parseFloat(notaMaxObtida)

			// Nota mínima de cada atividade
			const notaMinObtida = notas.length != 0 ? Math.min(...notas) : 0.0;
			data.atividades[indexA].itensAtividade[indexIA].notaMinObtida = parseFloat(notaMinObtida)

			// Entregas de cada Item da atividade
			const totalEntregas = data.estudantes.length
			data.atividades[indexA].itensAtividade[indexIA].totalEntregas = parseFloat(totalEntregas)

			const totalEntregasRealizadas = itemAtividade.entregas
				.flatMap((entrega) => entrega)
				.length
			data.atividades[indexA].itensAtividade[indexIA].totalEntregasRealizadas = parseFloat(totalEntregasRealizadas)

		}

	}

	return data
}
