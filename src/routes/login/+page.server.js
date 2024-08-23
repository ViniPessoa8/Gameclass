import { fail, redirect } from "@sveltejs/kit";
import { loginUser } from "$controllers/auth";
import { getInstituicaoById } from "../../lib/server/controllers/instituicao";

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		let userLogin = data.get("login")
		let userPassword = data.get("password")
		let res;

		// NOTE: Queremos mesmo tratar isso com uma catch??
		try {
			res = await loginUser(userLogin, userPassword)
		} catch (e) {
			return fail(400, { not_registered: true })
		}

		if (res) {
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

			redirect(307, "/escolha_perfil")
		} else {
			console.log("RES FALHOU")
			return fail(400, { incorrect: true })
		}
	},
}

