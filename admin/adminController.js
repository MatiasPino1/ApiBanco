const {getAllUsers,getOneUser,deleteOne,allBalance,balanceBySB,changeOneBalance,changeOneSB, getCommentsWith,getAllComments} = require("./adminModel")

const allUsers = async(req,res,next) => {
    const dbResponse= await getAllUsers(+req.params.savingsBank)
    dbResponse instanceof Error ? next(dbResponse) : res.status(200).json(dbResponse)
 }
 const oneUser = async(req,res,next) => {
    if(isNaN(Number(req.params.savingsBank))){                                                
      let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
      error.status = 400
      return next(error)  
    } else
{
if (req.params.savingsBank.length < 8) {
    let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
    error.status = 400
    return next(error)  
}
else{
    if(req.params.savingsBank.length > 8) {
        let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
      error.status = 400
      return next(error)  
    }
}}
if (req.params.savingsBank.length = 8){
const dbResponse = await getOneUser(+req.params.savingsBank)
if (dbResponse instanceof Error) return next(dbResponse)
dbResponse.length ? res.status(200).json(dbResponse) : next() 
}
}

const deleteUser = async (req,res,next) => {
    if (isNaN(Number(req.params.savingsBank))) {                                                
        let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
      error.status = 400
      return next(error)}
else{
        if (req.params.savingsBank.length < 8) {
            let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
            error.status = 400
            return next(error)}
else{
    if(req.params.savingsBank.length > 8) {
        let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
      error.status = 400
      return next(error)  
    }
}}

if(req.params.savingsBank.length = 8) {
        const dbResponse = await deleteOne(+req.params.savingsBank)
        if (dbResponse instanceof Error) return  next(dbResponse); 
        dbResponse.affectedRows ? res.status(204).end() : next()
    }
} 


const getAllBalance = async (req,res,next) => {
    const dbResponse = await allBalance()
    dbResponse instanceof Error ? next(dbResponse) : res.status(200).json(dbResponse)
}

const getBalanceBySB = async(req,res,next)=>{
    
    if(isNaN(Number(req.params.savingsBank))){                                                
        let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
        error.status = 400
        return next(error)  
    } 
    else{
if (req.params.savingsBank.length < 8) {
    let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
    error.status = 400
    return next(error)  
}
else{
    if(req.params.savingsBank.length > 8) {
        let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
        error.status = 400
        return next(error)  
    }
}}

    if(req.params.savingsBank.length = 8){
        const dbResponse = await balanceBySB(+req.params.savingsBank)
        if(dbResponse instanceof Error) return next(dbResponse)
        dbResponse.length ? res.status(200).json({message:`Balance of ${req.params.savingsBank} is : ${dbResponse[0].accBalance}`}) : next()
}
}
const changeBalanceBySB = async (req,res,next) => {
    if (isNaN(Number(req.params.savingsBank))) {                                                
        let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
      error.status = 400
      return next(error)}
else{
        if (req.params.savingsBank.length < 8) {
            let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
            error.status = 400
            return next(error)}
else {
    if(req.params.savingsBank.length > 8) {
      let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
      error.status = 400
      return next(error)  
    }
}}

    if(req.params.savingsBank.length = 8) {
    const user = req.body.affBalance
    const dbResponse = await changeOneBalance(+req.params.savingsBank,user)
    if(dbResponse instanceof Error)return next(dbResponse) 
    dbResponse.affectedRows ? res.status(200).json({message:`Saldo cambiado.`}) : next()
    } 

}

const changeSbBySB = async (req,res,next) => {

    if (isNaN(Number(req.params.savingsBank))) {                                                
     let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
       error.status = 400
       return next(error)}
 else{
     if (req.params.savingsBank.length < 8) {
         let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
         error.status = 400
         return next(error)}
 else {
 if(req.params.savingsBank.length > 8) {
     let error = new Error("Porfavor escriba su numero de caja de ahorro de 8 digitos")
     error.status = 400
     return next(error)
 }}}
 
 if(req.params.savingsBank.length = 8) {
     const user = req.body.savingsBank
     const dbResponse = await changeOneSB(+req.params.savingsBank,user)
     if (dbResponse instanceof Error) return next(dbResponse)
     dbResponse.affectedRows ? res.status(200).json({message:`Caja de ahorro cambiada.`}) : next()
 } 
 
 }
 const listComments = async(req,res,next) => {
   let dbResponse = null
   if(req.query.title){
    dbResponse = await getCommentsWith(req.query.title)
   }else{
    dbResponse = await getAllComments()}
    if(dbResponse instanceof Error)return next(dbResponse)
    dbResponse.length ? res.status(200).json(dbResponse) : next()
}
 module.exports={allUsers,oneUser,deleteUser,getAllBalance,getBalanceBySB,changeBalanceBySB,changeSbBySB,listComments}
