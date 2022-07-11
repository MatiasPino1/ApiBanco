const {encrypt,compare} = require("../utils/handlePassword")
const {newUser,loginUser,getUser,editOneUser,editPassword} = require("./usersModel")
const {matchedData} = require("express-validator")
const nodemailer = require("nodemailer")
const {tokenSign,tokenVerify}= require("../utils/handleJWT")
const public_url = process.env.public_url
const register = async(req,res,next) => {
    const cleanBody= matchedData(req)
    const image = `${public_url}/${req.file}`
    const hashedPassword = await encrypt(req.body.password)
    const dbResponse = await newUser({...cleanBody,password:hashedPassword,file:image})
    if  (dbResponse instanceof Error) return next(dbResponse)
    const user = {
        id:cleanBody.id,
      name:cleanBody.username,
      email:cleanBody.email
    } 
    const token = await tokenSign(user, "1h")
    res.status(201).json({message : `User created: ${req.body.username}`,JWT: token})
}
const login = async(req,res,next) => {
    const dbResponse = await loginUser(req.body.email)
    if(!dbResponse.length) return next()
    if(await compare(req.body.password,dbResponse[0].password)){
        const user = {
            id:dbResponse[0].id,
            name:dbResponse[0].username,
            email:dbResponse[0].email
          } 
          const token = await tokenSign(user, "1h")
    res.cookie("token",token).status(200).json({message:"Logged in,if you want to add or withdraw money from the bank you need to copy this JWT",JWT: token,name:user.name,email:user.email})
    }
    else{
        let error = new Error("Unauthorized")
        error.status = 401
        next(error)
    }
    }

const editUser= async(req,res,next)=>{
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
      return next(error)  }}
}
if(req.params.savingsBank.length = 8) {
    const hashedPassword = await encrypt(req.body.password)
    const image = `${public_url}/${req.file.filename}`
    const user = {
        username:req.body.username,
        password:hashedPassword,
        completedName:req.body.completedName,
        email:req.body.email,
        file:image
    }
    const dbResponse=await editOneUser(req.params.savingsBank,user)
    if(dbResponse instanceof Error)return next(dbResponse)  
    dbResponse.affectedRows ? res.status(200).json({message: "User Modified"}) : next() 
    } 
    
}
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.mail_user,
      pass: process.env.mail_pass
    }
  });

const forgot = async(req,res,next)=>{
    const dbResponse = await loginUser(req.body.email)
    if(!dbResponse.length) return next()
    const user = {
        id:dbResponse[0].id,
        name:dbResponse[0].username,
        email:dbResponse[0].email
    }
    const token = await tokenSign(user,`15m`)
    const link = `${public_url}/users/reset/${token}`
    let mailDetails = {
        from:"sudBank@gmail.com",
        to:user.email,
        subject:"subBank Password Recovery",
        html:`<h2>Password Recovery Service</h2>
        <p>To reset your password, please click on the link below and follow the instructions</p>
        <a href="${link}">click to recover your password<a/>`
    }
    transport.sendMail(mailDetails, (error, data)=>{
        if (error) {
            error.message = "Internal Server Error"
            next(error)
        }
        else res.status(200).json({message: `Hi ${user.name},we ve sent an email with instructions to ${user.email}...Hurry Up`})
    })
}

const reset = async(req,res,next)=>{
    const {token} = req.params
    const tokenStatus = await tokenVerify(token)
    if (tokenStatus instanceof Error ){
        res.send(tokenStatus)
    }else {res.render("reset", {tokenStatus, token})}
}

const saveNewPass = async(req,res,next) =>{
const {token} = req.params
const tokenStatus = await tokenVerify(token)
if(tokenStatus instanceof Error) return res.send(tokenStatus)
const newPassword = await encrypt(req.body.password_1)
const dbResponse= await editPassword(tokenStatus.id,{password:newPassword})
dbResponse instanceof Error ? next(dbResponse) : res.status(200).json({message:`Password changed for user ${tokenStatus.name}`})
}

module.exports={register,login,editUser,forgot,reset,saveNewPass}