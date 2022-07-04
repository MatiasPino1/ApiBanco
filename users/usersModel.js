const connection = require("../db/config")

const newUser = async (newUser) => {
    const query = `INSERT INTO users SET ?`
    try {
        return await connection.query(query,newUser)
    } catch (error) {
        error.message = error.code
        return error
    }
}
const loginUser = async(email) => {
    const query = `select * from users where email = '${email}' limit 1`
    try {
        return await connection.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }}

const getUser = async(email) => {
 const query = `select completedName,savingsBank,accBalance from users where email = '${email}' limit 1`
 try {
    return await connection.query(query)
} catch (error) {
    error.message = error.code
    return error
}}

const editOneUser = async(savingsBank,user) => {
    const query = `update users set ? where savingsBank = ${savingsBank}`
    try {
        return await connection.query(query,user)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const editPassword = async(id,user) => {
    const query = `update users set ? where id = ${id}`
    try {
        return await connection.query(query,user)
    } catch (error) {
        error.message = error.code
        return error
    }
}
module.exports = {newUser,loginUser,getUser,editOneUser,editPassword}