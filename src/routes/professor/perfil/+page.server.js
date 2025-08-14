import ProfessorController from "$lib/server/controllers/professor"
import UsuarioController from "$lib/server/controllers/usuario";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import TurmaController from "$lib/server/controllers/turma";
import AtividadeController from "$lib/server/controllers/atividade";

const usuarioController = new UsuarioController()
const turmaController = new TurmaController()
const itemAtividadeController = new ItemAtividadeController()
const atividadeController = new AtividadeController()

export async function load({ cookies }) {
	const session = JSON.parse(cookies.get("session"));
	let idProfessor = session.id

	let data = {}
	let itensPendentes = []
	const usuario = await usuarioController.buscaPorLogin(session.login)

	// Lista todas as turmas do professor
	const turmas = await turmaController.listaPorProfessor(idProfessor)

	for (const turma of turmas) {
		// Pra cada turma, lista todas as atividade
		const atividades = (await atividadeController.listaPorIdTurma(turma.id)).map((a) => a.toObject())

		for (const atividade of atividades) {
			// Pra cada atividade, lista todas os itens de atividade
			const itensAtividade = (await itemAtividadeController.listaPorIdAtividade(atividade.id)).map((ia) => ia.toObject())
			for (const itemAtividade of itensAtividade) {
				// Checa pendencias
				itemAtividade.pendencias = parseInt(await itemAtividadeController.possuiAvaliacoesPendentes(itemAtividade.id))

				if (itemAtividade.pendencias > 0) {
					itemAtividade.id_turma = turma.id;
					itemAtividade.nome_turma = turma.nome;
					itemAtividade.id_atividade = atividade.id;
					itemAtividade.nome_atividade = atividade.titulo;

					itensPendentes.push(itemAtividade);
				}
			}

			atividade.itensAtividade = itensAtividade
		}

		turma.atividades = atividades
	}

	data.itensPendentes = itensPendentes
	data.usuario = usuario.toObject()

	return data
}
