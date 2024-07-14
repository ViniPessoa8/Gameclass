import bcrypt from 'bcryptjs'

/**
 * Realiza o login do usuário 
 * @param {string} username Nome de usuário
 * @param {string} password Senha do usuário
 */
export function login(username, password) {
    console.log(username, password);

    // Sync
    let salt = bcrypt.genSaltSync();
    console.log("salt: " + salt);
    let hash = bcrypt.hashSync(password, salt);
    console.log("hash: " + hash);

    // Async
    bcrypt.genSalt(10, (err, asyncSalt) => {
        if (err) {
            console.log(err);
        }

        console.log("asyncSalt: " + asyncSalt);

        bcrypt.hash(password, asyncSalt, (err, asyncHash) => {
            if (err) {
                console.log(err);
            }

            console.log("asyncHash: " + asyncHash);

        })
    })

}
