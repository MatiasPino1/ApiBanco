const connection = require("../db/config")

const changeOneBalance = async (email,user) => {
    const query = `update users set accBalance = accBalance + ? where email = '${email}' limit 1`
    try {
        return await connection.query(query,user)
    } catch (error) {
    error.message = error.code
    error.status = 500
    return error
    }
}

module.exports = {changeOneBalance}