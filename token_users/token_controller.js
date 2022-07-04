const { changeOneBalance } = require("./token_model");

const updateOneBalance = async(req,res,next) => {
if(!req.token){
    let error = new Error("Unauthorized")
    error.status = 401
    return next(error)
}
const user = req.body.affBalance
const dbResponse =await changeOneBalance(req.body.email,user)
if(dbResponse instanceof Error)return next({dbResponse}) 
    dbResponse.affectedRows ? res.status(200).json({message:`Saldo cambiado.`,token:req.token}) : next() 
}
module.exports = {updateOneBalance}