import { getPool } from "../../../config/database.js"
import { DB_INFO } from "../../constants.js";

export async function listarBD() {
	const db = getPool()
	const query = `SELECT * FROM ${DB_INFO.tables.instituicao}`;
	const res = await db.query(query);
	return res;
}

export async function buscarPorNomeBD(nome) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.instituicao} WHERE nome=$1`,
		values: [nome]
	}
	const res = await db.query(query);
	return res;
}

export async function buscarPorIdBD(id) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.instituicao} WHERE id=$1`,
		values: [id]
	}
	const res = await db.query(query);
	return res;
}
