const express= require ("express")
const cors = require("cors")
const server=express()
const hbs = require("express-handlebars")
const path = require("path")
require("dotenv").config()
const PORT = process.env.PORT
server.use(express.json()) 
server.use(express.urlencoded({extended:true})) 
server.use(cors())
server.use(express.static("storage"))

server.use("/css",express.static(path.join(__dirname,`node_modules/bootstrap/dist/css`)))
server.use("/js",express.static(path.join(__dirname,`node_modules/bootstrap/dist/js`)))
server.set("view engine","hbs")
server.set("views",path.join(__dirname,"./views"))
server.engine("hbs",hbs.engine({extname:"hbs"}))

server.get("/",(req,res)=>{
    res.send(`<h2>Bienvenido a sudBank</h2>
    <h3>Su banco de confianza</h3>`)
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


server.listen(PORT,(err)=>{
    err? console.log(err) : console.log(`Servidor corriendo en http://localhost:${PORT}`)
})