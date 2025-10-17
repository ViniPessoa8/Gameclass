import { carregaConfigBD } from "../repositories/config"
import { log, info, error, debug } from "$lib/utils/logger"

export default class ConfigController {
	async carregaConfig(chave) {
		let res = await carregaConfigBD(chave)

		log(`ConfigController -> carregaConfig(${chave}) => ${res.rows[0].valor}`)
		return res.rows[0].valor
	}

}
