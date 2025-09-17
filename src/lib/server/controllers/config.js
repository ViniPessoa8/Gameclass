import { carregaConfigBD } from "../repositories/config"

export default class ConfigController {
	async carregaConfig(chave) {
		let res = await carregaConfigBD(chave)
		return res.rows[0].valor
	}

}
