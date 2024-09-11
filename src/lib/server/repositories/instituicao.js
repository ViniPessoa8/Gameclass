import { dbConn } from "../../../config/database.js"
import { DB_INFO } from "../../constants.js";

export async function getInstituicoesDB() {
	const query = `SELECT * FROM ${DB_INFO.tables.instituicao}`;
	const res = await dbConn.query(query);
	return res;
}

export async function getInstituicaoByNomeDB(nome) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.instituicao} WHERE nome=$1`,
		values: [nome]
	}
	const res = await dbConn.query(query);
	return res;
}

export async function getInstituicaoByIdDB(id) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.instituicao} WHERE id=$1`,
		values: [id]
	}
	const res = await dbConn.query(query);
	return res;
}
