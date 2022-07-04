const connection = require("../db/config")

const addOneComment = (post) =>{
    const query = `insert into posts set ?`
    try {
        return  connection.query(query,post)
    } catch (error) {
        error.message = error.code
    }
}



module.exports = {addOneComment}