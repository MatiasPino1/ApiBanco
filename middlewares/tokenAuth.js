const {tokenVerify} = require("../utils/handleJWT")

const tokenAuth = async(req,res,next) => {
    try {
        if(!req.headers.authorization){
            let error = new Error("No token")
            error.status= 403
            return next(error)
        }
        const token = req.headers.authorization.split(" ").pop()
        const tokenStatus= await tokenVerify(token)
        if(tokenStatus instanceof Error) {
            error.message = "Token Expired"
            error.status = 403
            return next(error)
        }
        req.token = tokenStatus
        next()
    } catch (error) { 
        error.status = "Internal Error Server"
        return next()

    }
}

module.exports = tokenAuth