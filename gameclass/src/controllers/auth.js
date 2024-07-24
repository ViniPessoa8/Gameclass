import bcrypt from "bcryptjs"
import { loginDB, registerDB } from "../repositories/auth";

export async function registerNewUser(dbConn, name, login, password) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(password, salt, async (err, hash) => {
			await registerDB(dbConn, name, login, hash, salt)
			return true
		})
	})
	return false
}

export async function loginUser(dbConn, login, password) {
	const res = await loginDB(dbConn, login, password)

	console.log(Boolean(res.rowCount))
	if (res.rowCount) {
		console.log("Deu bom no login")
		return true
	}

}
