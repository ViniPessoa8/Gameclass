
import { fail, redirect } from "@sveltejs/kit";
import { registerNewUser } from "$controllers/auth";


export const actions = {
	default: async ({ cookies, request }) => {
		// get data
		const data = await request.formData();
		console.log("data:", data)
		// register user
		console.log(data.get("nome"), data.get("usuario"), data.get("password"), data.get("instituicao"), data.get("dtNasc"))
		const res = await registerNewUser(data.get("nome"), data.get("usuario"), data.get("password"), data.get("instituicao"), data.get("dtNasc"))
		console.log("RES:", res)
		if (res) {
			redirect(300, "/login")
		}
		//
	}
}

