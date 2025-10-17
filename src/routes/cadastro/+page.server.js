
import { fail, redirect, error } from "@sveltejs/kit";
// import { registerNewUser } from "$controllers/auth";
import { getRandomInt } from "$lib/utils/util";
import { CORES_PERFIL } from "$lib/constants";
import UsuarioController from "$lib/server/controllers/usuario";

const usuarioController = new UsuarioController()

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		let res;

		if (!data.get("login")
			|| !data.get("password")
			|| !data.get("nome")
			|| !data.get("dtEntregaMin")
			|| !data.get("email")
		) {
			error(400, "Missing Data")
		}

		let bio = data.get("bio") ? data.get("bio") : ""

		try {

			const cor = CORES_PERFIL[getRandomInt(CORES_PERFIL.length)].slice(1)
			res = await usuarioController.registra(
				data.get("nome"),
				data.get("login"),
				data.get("password"),
				// data.get("instituicao"),
				data.get("dtEntregaMin"),
				bio,
				data.get("email"),
				// data.get("matriculaAluno"),
				cor
			)
		} catch (e) {
			// TODO: Verificar se é mesmo esse erro
			console.error("erro => ", e)
			return fail(400, { already_registered: true })
		}

		if (res) {
			cookies.set("toast", 'cadastro', { path: "/" })
			redirect(300, "/login")
		}
	}
}

