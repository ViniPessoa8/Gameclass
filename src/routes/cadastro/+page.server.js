
import { fail, redirect, error } from "@sveltejs/kit";
import { registerNewUser } from "$controllers/auth";
import { getRandomInt } from "$lib/utils/util";
import { CORES_PERFIL } from "$lib/constants";

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		let res;

		if (!data.get("login") || !data.get("password") || !data.get("nome") || !data.get("instituicao") || !data.get("dtNasc") || !data.get("email") || !data.get("matriculaAluno")) {
			error(400, "Missing Data")
		}

		let bio = data.get("bio") ? data.get("bio") : ""

		try {

			const cor = CORES_PERFIL[getRandomInt(CORES_PERFIL.length)].slice(1)
			res = await registerNewUser(data.get("nome"), data.get("login"), data.get("password"), data.get("instituicao"), data.get("dtNasc"), bio, data.get("email"), data.get("matriculaAluno"), cor)
		} catch (e) {
			// TODO: Verificar se é mesmo esse erro
			return fail(400, { already_registered: true })
		}

		if (res) {
			cookies.set("toast", 'cadastro', { path: "/" })
			redirect(300, "/login")
		}
	}
}

