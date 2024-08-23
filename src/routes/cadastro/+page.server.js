
import { fail, redirect } from "@sveltejs/kit";
import { registerNewUser } from "$controllers/auth";


export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		let res;

		try {
			res = await registerNewUser(data.get("nome"), data.get("usuario"), data.get("password"), data.get("instituicao"), data.get("dtNasc"))
		} catch (e) {
			return fail(400, { already_registered: true })
			console.log("cadastro ERROR: ", e)
		}

		if (res) {
			redirect(300, "/login")
		}
		//
	}
}

