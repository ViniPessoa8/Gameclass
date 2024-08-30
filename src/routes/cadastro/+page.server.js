
import { fail, redirect, error } from "@sveltejs/kit";
import { registerNewUser } from "$controllers/auth";


export const actions = {
	default: async ({ request, cookies }) => {
		console.debug("[CADASTRO SUBMIT]")
		const data = await request.formData();
		let res;

		console.debug(data)

		if (!data.get("login") || !data.get("password") || !data.get("nome") || !data.get("instituicao") || !data.get("dtNasc") || !data.get("email") || !data.get("matriculaAluno")) {
			console.log("\t", 400, "Missing data.")
			error(400, "Missing Data")
		}

		let bio = data.get("bio") ? data.get("bio") : ""

		try {
			res = await registerNewUser(data.get("nome"), data.get("login"), data.get("password"), data.get("instituicao"), data.get("dtNasc"), bio, data.get("email"), data.get("matriculaAluno"))
		} catch (e) {
			console.log("cadastro ERROR: ", e)
			// TODO: Verificar se é mesmo esse erro
			return fail(400, { already_registered: true })
		}

		if (res) {
			cookies.set("toast", 'cadastro', { path: "/" })
			redirect(300, "/login")
		}
	}
}

