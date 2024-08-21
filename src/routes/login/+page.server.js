import { fail, redirect } from "@sveltejs/kit";
import { loginUser } from "$controllers/auth";
import { getInstituicaoById } from "../../lib/server/controllers/instituicao";

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

		if (res) {
			//format cookies
			let session = {
				"nome": res.nome,
				"login": res.login,
				"dtNasc": res.dt_nasc,
				"instituicao": await getInstituicaoById(res.id_instituicao)
			}

			cookies.set('session', JSON.stringify(session), {
				path: '/',
				httpOnly: true,
				sameSite: true,
				secure: false
			});
			console.log(session)

			redirect(307, "/escolha_perfil")
		} else {
			console.log("RES FALHOU")
			return fail(400, { incorrect: true })
		}
	},
}

