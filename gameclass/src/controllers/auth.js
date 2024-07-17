import { register } from "../repositories/auth";

const bcrypt = require("bcrypt")

export async function registerNewUser(login, password) {

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    register(login, hash, salt)
}