import { redirect } from "@sveltejs/kit";
import { getTurmasByIdProfessor } from "../../lib/server/controllers/turma";

export async function load({ cookies }) {
	const session_raw = cookies.get("session");
	if (!session_raw) {
		console.log("Usuário não autenticado")
		redirect(300, "/")
	}
	const perfil_raw = cookies.get("perfil");
	const data = JSON.parse(session_raw);
	data.perfil = perfil_raw

	data.turmas = await getTurmasByIdProfessor(data.id)

	return data
}
