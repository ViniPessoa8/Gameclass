import { fail, redirect } from "@sveltejs/kit";
import { loginUser } from "../../controllers/auth";

export function load({ cookies }) {
	console.log("/login cookies.get('session'): ", cookies.get("session"));
	console.log("/login cookies.get('user'): ", cookies.get("user"));
}

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		let userLogin = data.get("login")
		let userPassword = data.get("password")

		let errorObject = {}
		if (!userLogin) {
			errorObject.missingLogin = true;
		}

		if (!userPassword) {
			errorObject.missingPassword = true;
		}

		if (Object.keys(errorObject).length != 0) {
			console.log("errorObject:", errorObject)
			return fail(400, errorObject)
		}

		let dbConn = locals.db_conn
		const res = await loginUser(dbConn, userLogin, userPassword)
		console.log(res)

		if (res) {
			console.log("RES sucesso")
			cookies.set('session', res, {
				path: '/',
				httpOnly: true,
				sameSite: true,
				secure: false
			});

			console.log('LOGIN session: ', cookies.get('session'));
			redirect(307, "/escolha_perfil")
		} else {
			console.log("RES FALHOU")
			return fail(400, { incorrect: true })
		}




	},
}

