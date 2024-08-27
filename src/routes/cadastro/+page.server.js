
import { fail, redirect } from "@sveltejs/kit";
import { registerNewUser } from "$controllers/auth";


export const actions = {
	default: async ({ request, cookies }) => {
		console.debug("[CADASTRO SUBMIT]")
		const data = await request.formData();
		let res;

		try {
			res = await registerNewUser(data.get("nome"), data.get("usuario"), data.get("password"), data.get("instituicao"), data.get("dtNasc"))
		} catch (e) {
			console.log("cadastro ERROR: ", e)
			return fail(400, { already_registered: true })
		}

		if (res) {
			cookies.set("toast", 'cadastro', { path: "/" })
			redirect(300, "/login")
		}
		//
	}
}

