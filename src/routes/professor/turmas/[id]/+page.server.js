import { redirect } from "@sveltejs/kit"
import { findUserByLogin } from "$lib/server/repositories/auth"
import { info, log } from "$lib/utils/logger"

export async function load({ cookies, params }) {
	redirect(307, `/${cookies.get('perfil')}/turmas/` + params.id + "/atividades")
}

