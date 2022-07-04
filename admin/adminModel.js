const connection = require("../db/config")

const getAllUsers = async ()=>{
    const query = `select username, password, completedName,savingsBank, email from users`
    try {
        return await connection.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}
const getOneUser = async(savingsBank) => {
    const query = `select username, password, completedName,savingsBank from users where savingsBank = ${savingsBank}`
    try {
        return await connection.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}
const deleteOne = async(savingsBank) => {
    const query = `delete from users where savingsBank = ${savingsBank}`
    try {
        return await connection.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}
const allBalance = async () => {
    const query = `select completedName ,accBalance from users`
    try {
        return await connection.query(query)
    } catch (error) {
        error.message = error.code
        error.status = 500
        return error
    }
}
const balanceBySB= async (savingsBank)=>{
    const query = `select accBalance from users where savingsBank = ${savingsBank};`
    try {
        return await connection.query(query)
    } catch (error) {
        error.message = error.code
        error.status = 500
        return error
    }
}
const changeOneBalance = async (savingsBank,user) => {
    const query = `update users set accBalance = accBalance + ? where savingsBank = ${savingsBank}`
    try {
        return await connection.query(query,user)
    } catch (error) {
    error.message = error.code
    error.status = 500
    return error
    }
}
const changeOneSB = async (savingsBank,user) => {
    const query = `update users set savingsBank = ? where savingsBank = ${savingsBank}`
    try {
        return await connection.query(query,user)
    } catch (error) {
        error.message = error.code
        error.status = 500
        return error
    }
}

const getAllComments = async() => {
    const query = `select * from posts`
try {
    return await connection.query(query)
} catch (error) {
error.message = error.code
error.status = 500
return error
}}

const getCommentsWith = async(string) => {
 const query = `select * from posts where title like '%${string}%'`
 try {
    return await connection.query(query)
} catch (error) {
error.message = error.code
error.status = 500
return error
}}
module.exports={getAllUsers,getOneUser,deleteOne,allBalance,balanceBySB,changeOneBalance,changeOneSB,getCommentsWith,getAllComments}