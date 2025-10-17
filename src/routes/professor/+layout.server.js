import { redirect } from "@sveltejs/kit";

import TurmaController from "../../lib/server/controllers/turma";
import UsuarioController from "../../lib/server/controllers/usuario";
import AtividadeController from "../../lib/server/controllers/atividade";
import EtapaController from "../../lib/server/controllers/itemAtividade";
import GrupoController from "../../lib/server/controllers/grupo";
import EstudanteController from "../../lib/server/controllers/estudante";
import EntregaController from "../../lib/server/controllers/entrega";
import { info, log } from "$lib/utils/logger"

const turmaController = new TurmaController()
const usuarioController = new UsuarioController()
const atividadeController = new AtividadeController()
const etapaController = new EtapaController()
const grupoController = new GrupoController()
const estudanteController = new EstudanteController()
const entregaController = new EntregaController()

export async function load({ url, cookies }) {
	info("Carregando layout do professor")
	const session_raw = cookies.get("session");
	const parts = url.pathname.split('/').filter(Boolean); // remove vazios

	if (!session_raw) {
		console.log("Usuário não autenticado")
		cookies.set("toast", 'sessao_expirada', { path: '/' });
		redirect(300, "/")
	}

	if (url.pathname == "/professor") {
		redirect(301, "/professor/turmas")
	}

	const perfil_raw = cookies.get("perfil");
	const data = JSON.parse(session_raw);
	const usuario = await usuarioController.buscaPorLogin(data.login)
	const turmas = await turmaController.listaPorProfessor(data.id)

	// Turma
	if (parts.length > 2 && parts[2] && parts[2].trim() != "create") {
		data.turma = await turmaController.buscaPorId(parts[2])
	}

	if (parts[3] && parts[4] && parts[3] == 'membros') {
		data.estudante = await estudanteController.buscaPorId(parts[4])

	}

	if (parts[4] && parts[4] != 'create' && parts[3] === "atividades") {
		// Atividade
		if (parts.length > 4) {
			const atividade = await atividadeController.buscaPorId(parts[4])
			data.atividade = atividade.toObject()

		}

		if (parts[5] != "edit") {
			// Etapa
			if (parts.length > 5) {
				const etapa = await etapaController.buscaPorId(parts[5])
				data.etapa = etapa.toObject()
			}

			// Estudante/Grupo
			if (parts[6] != "edit") {
				if (parts.length > 6) {
					const entrega = await entregaController.buscaPorId(parts[6])

					if (data.etapa.em_grupos) {
						data.grupo = await grupoController.buscaPorId(entrega.id_grupo_de_alunos)
					} else {
						data.estudante = await estudanteController.buscaPorId(entrega.id_estudante)
					}
				}
				// Integrante
				if (parts.length > 7 && Number.isInteger(parts[7])) {
					data.integrante = await estudanteController.buscaPorId(parts[7])
				}
			}


		}


	}

	data.perfil = perfil_raw
	data.turmas = turmas
	data.cor = usuario.cor

	return data
}
