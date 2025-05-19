import { redirect } from "@sveltejs/kit";
import { getTurmasByIdProfessor } from "../../lib/server/controllers/turma";
import { findUserByLogin } from "../../lib/server/repositories/auth";

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
	data.perfil = perfil_raw

	data.turmas = await getTurmasByIdProfessor(data.id)

	const usuario = await findUserByLogin(data.login)
	data.cor = usuario.cor

	return data
}
