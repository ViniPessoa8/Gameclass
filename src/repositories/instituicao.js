export async function getInstituicoesDB(dbConn) {
	const query = "SELECT * FROM instituicao";
	const res = await dbConn.query(query);
	return res;
}
