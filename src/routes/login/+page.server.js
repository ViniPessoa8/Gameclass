import { fail, redirect } from "@sveltejs/kit";
import UsuarioController from "$lib/server/controllers/usuario";
import InstituicaoController from "$lib/server/controllers/instituicao";

const usuarioController = new UsuarioController();
const instituicaoController = new InstituicaoController();

export function load({ cookies }) {
	const session = cookies.get("session");
	const perfil = cookies.get("perfil");

	if (session) {
		redirect(302, `/${perfil}/turmas`)
	}

	const message = cookies.get("toast");
	if (message === 'cadastro') {
		cookies.set("toast", "", { path: '/' });
		return { "toast": message }
	} else {
		return { "toast": "" }
	}
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		let userLogin = data.get("login")
		let userPassword = data.get("password")
		let res;

		// NOTE: Queremos mesmo tratar isso com uma catch??
		try {
			res = await usuarioController.login(userLogin, userPassword)
		} catch (e) {
			return fail(400, { not_registered: true })
		}

		if (res) {
			let session = {
				"id": res.id,
				"nome": res.nome,
				"login": res.login,
				"dtNasc": res.dt_nasc,
				"instituicao": await instituicaoController.buscaPorNome(res.id_instituicao)
			}

			cookies.set('session', JSON.stringify(session), {
				path: '/',
				httpOnly: true,
				sameSite: true,
				secure: false
			});

			cookies.set("toast", 'login', { path: '/' });
			redirect(300, "/escolha_perfil")

		} else {
			return fail(400, { incorrect: true })
		}
	},
}

