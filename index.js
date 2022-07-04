const express= require ("express")
const server=express()
const hbs = require("express-handlebars")
const path = require("path")
require("dotenv").config()
const PORT = process.env.port
server.use(express.json()) 
server.use(express.urlencoded({extended:true})) 
server.use(express.static("storage"))

server.use("/css",express.static(path.join(__dirname,`node_modules/bootstrap/dist/css`)))
server.use("/js",express.static(path.join(__dirname,`node_modules/bootstrap/dist/js`)))
server.set("view engine","hbs")
server.set("views",path.join(__dirname,"./views"))
server.engine("hbs",hbs.engine({extname:"hbs"}))

server.get("/",(req,res)=>{
    res.send("Probando Api")
})

server.use("/users",require("./users/usersRoute"))

server.use("/admin",require("./admin/adminRoute"))

server.use("/token_users",require("./token_users/token_route"))

server.use("/posts",require("./posts/postsRoute"))

server.use((req,res,next)=>{
    let error = new Error ("Resource not Found")
    error.status = 404
    next(error)
})

server.use((error,req,res,next)=>{
    if (!error.status) {
        error.status = 500
    }
    res.status(error.status)
    res.json({status : error.status, message: error.message})
})


server.listen(3010,(err)=>{
    err? console.log(err) : console.log(`Servidor corriendo en http://localhost:${3010}`)
})