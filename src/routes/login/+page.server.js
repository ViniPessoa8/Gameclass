import { fail, redirect } from "@sveltejs/kit";
import { loginUser } from "$controllers/auth";

export function load({ cookies }) {
	console.log("/login cookies.get('session'): ", cookies.get("session"));
	console.log("/login cookies.get('user'): ", cookies.get("user"));
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		let userLogin = data.get("login")
		let userPassword = data.get("password")

		// TODO: Change response data from boolean to dict with info
		const res = await loginUser(userLogin, userPassword)
		console.log(res)

		if (res) {
			console.log("RES sucesso")
			cookies.set('session', res, {
				path: '/',
				httpOnly: true,
				sameSite: true,
				secure: false
			});

			redirect(307, "/escolha_perfil")
		} else {
			console.log("RES FALHOU")
			return fail(400, { incorrect: true })
		}
	},
}

