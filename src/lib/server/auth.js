import { ROLES } from "../constants";

/*
 * Autentica o cliente
 * @param {RequestEvent} event - context
 *
 */
export const authenticateUser = (event) => {

	const { cookies } = event;

	console.log("cookies: ", cookies);

	const user = {
		"id": 420,
		"name": "Nome Completo do Usuário",
		"usuario": "nomeDeUsuario",
		"role": ROLES.estudante
	}

	return user;
} 
