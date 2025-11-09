import AtividadeController from "$lib/server/controllers/atividade"
import ItemAtividadeController from "$lib/server/controllers/itemAtividade"
import EntregaController from "$lib/server/controllers/entrega"
import TurmaController from "$lib/server/controllers/turma"
import CriterioController from "$lib/server/controllers/criterio"
import Turma from "$lib/models/Turma"
import { info, log } from "$lib/utils/logger"

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const entregaController = new EntregaController()
const turmaController = new TurmaController()
const criterioController = new CriterioController()

export async function load({ params, cookies }) {
	info(`Carregando o relatório da turma ${params.id}`)
	let data = {}
	const idTurma = params['id']

	// Info da turma
	data.turma = new Turma(await turmaController.buscaPorId(idTurma)).toObject()

	// Atividades da turma
	let atividades = await atividadeController.listaPorIdTurma(idTurma);
	data.atividades = atividades.map((e) => e.toObject())

	// Itens de Atividade
	for (const [indexA, atividade] of atividades.entries()) {
		let itensAtividade = await itemAtividadeController.listaPorIdAtividade(atividade.id);
		itensAtividade = itensAtividade.map((e) => e.toObject())

		for (const [indexIA, itemAtividade] of itensAtividade.entries()) {
			// Entregas
			itensAtividade[indexIA].entregas = await entregaController.listaPorItemAtividade(itemAtividade.id);

			// Critérios
			itensAtividade[indexIA].criterios = await criterioController.listaPorIdItemAtividade(atividade.id);

			// Notas da entrega
			for (const [indexE, entrega] of itensAtividade[indexIA].entregas.entries()) {
				itensAtividade[indexIA].entregas[indexE].notas = await entregaController.listaNotasObtidasDeCriterios(entrega.id)
			}
		}
		data.atividades[indexA].itensAtividade = itensAtividade
	}

	data.estudantes = await turmaController.listaAlunos(idTurma);

	// ----- CALCULA ESTATISTICAS ----- // 
	info(`Calculando estatísticas da turma ${idTurma}`)

	// Média da turma
	//
	// Entregas de cada atividade
	const notasTurma = data.atividades
		.flatMap((atividade) => atividade.itensAtividade)
		.flatMap((itemAtividade) => itemAtividade.entregas)
		.flatMap((entrega) => entrega.notas)

	if (notasTurma.length > 0) {
		// Soma das notas da turma
		const somaNotasTurma = notasTurma.reduce((acc, nota) => acc = acc + nota.nota_atribuida, 0)
		data.somaNotasTurma = parseFloat(somaNotasTurma).toFixed(1)

		// Total de entregas da turma
		const totalEntregasTurma = notasTurma.length
		data.totalEntregasTurma = parseFloat(totalEntregasTurma).toFixed(1)

		// Média de notas da turma
		data.mediaTurma = data.totalEntregasTurma != 0 ? (somaNotasTurma / totalEntregasTurma).toFixed(2) : 0.0

		const notasAtribuidas = notasTurma.flatMap((nota) => nota.nota_atribuida)

		// Menor nota da turma
		data.menorNota = notasTurma.length != 0 ? Math.min(...notasAtribuidas).toFixed(1) : 0.0

		// Maior nota da turma
		data.maiorNota = notasTurma.length != 0 ? Math.max(...notasAtribuidas).toFixed(1) : 0.0

	} else {
		data.somaNotasTurma = "-"
		data.totalEntregasTurma = "-"
		data.mediaTurma = "-"
		data.menorNota = "-"
		data.maiorNota = "-"
	}

	for (const [indexA, atividade] of data.atividades.entries()) {
		info(`Calculando estatísticas da atividade ${atividade.id}`)


		// Nota total de cada atividade
		const somaNotas = atividade.itensAtividade
			.flatMap((itemAtividade) => itemAtividade.criterios)
			.flatMap((criterio) => criterio.pontuacao_max)
		let resultado = Math.max(...somaNotas)
		// .reduce((total, n) => total + n.pontuacao_max, 0); // inicia em 0
		data.atividades[indexA].notaMax = parseFloat(resultado).toFixed(1)

		// Soma de notas obtidas de cada atividade
		const somaNotasObtidas = atividade.itensAtividade
			.flatMap((itemAtividade) => itemAtividade.entregas)
			.flatMap((entrega) => entrega.notas)
			.reduce((total, n) => total + (n.nota_atribuida), 0); // inicia em 0
		data.atividades[indexA].somaNotasObtidas = parseFloat(somaNotasObtidas).toFixed(1)

		const notas = atividade.itensAtividade
			.flatMap((i) => i.entregas)
			.flatMap((e) => e.notas)
			.flatMap((n) => n.nota_atribuida)

		// Média de notas de cada atividade
		if (notas.length > 0) {
			const mediaNotas = somaNotasObtidas / notas.length;
			data.atividades[indexA].mediaNotas = parseFloat(mediaNotas).toFixed(1)
		} else {
			data.atividades[indexA].mediaNotas = "-"
		}

		// Nota máxima de cada atividade
		if (notas.length > 0) {
			const notaMaxObtida = Math.max(...notas);
			data.atividades[indexA].notaMaxObtida = parseFloat(notaMaxObtida).toFixed(1)
		} else {
			data.atividades[indexA].notaMaxObtida = "-"
		}

		// Nota mínima de cada atividade
		if (notas.length > 0) {
			const notaMinObtida = Math.min(...notas);
			data.atividades[indexA].notaMinObtida = parseFloat(notaMinObtida).toFixed(1)
		} else {
			data.atividades[indexA].notaMinObtida = "-"
		}

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
				.flatMap((nota) => nota.pontuacao_max)
			// .reduce((total, n) => total + (n.pontuacao_max), 0); // inicia em 0
			data.atividades[indexA].itensAtividade[indexIA].notaMax = somaNotas.length > 0 ? parseFloat(Math.max(...somaNotas)).toFixed(1) : "-"

			const somaNotasObtidas = itemAtividade.entregas
				.flatMap((entrega) => entrega.notas)
				.reduce((total, n) => total + (n.nota_atribuida ?? 0), 0); // inicia em 0
			data.atividades[indexA].itensAtividade[indexIA].somaNotasObtidas = parseFloat(somaNotasObtidas)

			const notas = itemAtividade.entregas
				.flatMap((e) => e.notas)
				.flatMap((n) => n.nota_atribuida)

			if (notas.length > 0) {
				// Média de notas de cada Item da atividade
				const mediaNotas = notas.length != 0 ? somaNotasObtidas / notas.length : 0.0;
				data.atividades[indexA].itensAtividade[indexIA].mediaNotas = parseFloat(mediaNotas).toFixed(1)

				// Nota máxima de cada atividade
				const notaMaxObtida = notas.length != 0 ? Math.max(...notas) : 0.0;
				data.atividades[indexA].itensAtividade[indexIA].notaMaxObtida = parseFloat(notaMaxObtida).toFixed(1)

				// Nota mínima de cada atividade
				const notaMinObtida = notas.length != 0 ? Math.min(...notas) : 0.0;
				data.atividades[indexA].itensAtividade[indexIA].notaMinObtida = parseFloat(notaMinObtida).toFixed(1)

			} else {
				data.atividades[indexA].itensAtividade[indexIA].mediaNotas = "-"
				data.atividades[indexA].itensAtividade[indexIA].notaMaxObtida = "-"
				data.atividades[indexA].itensAtividade[indexIA].notaMinObtida = "-"

			}

			// Entregas de cada Item da atividade
			const totalEntregas = data.estudantes.length
			data.atividades[indexA].itensAtividade[indexIA].totalEntregas = parseFloat(totalEntregas)

			const totalEntregasRealizadas = itemAtividade.entregas
				.flatMap((entrega) => entrega)
				.length
			data.atividades[indexA].itensAtividade[indexIA].totalEntregasRealizadas = parseFloat(totalEntregasRealizadas)

		}

	}

	// Boletim dos alunos
	const todasEntregas = data.atividades
		.flatMap(atividade => atividade.itensAtividade)
		.flatMap(itemAtividade => itemAtividade.entregas);

	data.boletimAlunos = data.estudantes.map(estudante => {

		const entregasDoEstudante = todasEntregas.filter(
			entrega => entrega.id_estudante == estudante.id_estudante
		);

		const notasDoEstudante = entregasDoEstudante
			.flatMap(entrega => entrega.notas)
			.map(nota => nota.nota_atribuida);

		let media = 0.0;
		if (notasDoEstudante.length > 0) {
			const soma = notasDoEstudante.reduce((acc, nota) => acc + nota, 0);
			media = soma / notasDoEstudante.length;
		}

		return {
			nome: estudante.nome,
			media: media
		};
	});

	return data
}
