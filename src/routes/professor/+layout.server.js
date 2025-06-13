import { redirect } from "@sveltejs/kit";

import TurmaController from "../../lib/server/controllers/turma";
import UsuarioController from "../../lib/server/controllers/usuario";

const turmaController = new TurmaController()
const usuarioController = new UsuarioController()

export async function load({ url, cookies }) {
	const session_raw = cookies.get("session");

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

	data.perfil = perfil_raw
	data.turmas = turmas
	data.cor = usuario.cor

	return data
}
