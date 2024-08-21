import { dbConn } from "../config/database.js"

export async function getInstituicoesDB() {
	const query = "SELECT * FROM instituicao";
	const res = await dbConn.query(query);
	return res;
}
