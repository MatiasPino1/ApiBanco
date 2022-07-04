const {check,validationResult}=require("express-validator")
const validatorResetPassword = [
check("password_1")
.exists()
.notEmpty().withMessage("Password cannot be empty")
.isLength({min:5,max:255}).withMessage("Password must have at least 5 characters")
.trim(),
check("password_2")
.custom(async(password_2,{req})=>{
    const password_1 = req.body.password_1
    if(password_1 !== password_2){
        throw new Error("Password must be identical")
    }
}),
(req,res,next) => {
    const token = req.params.token
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const arrWarnings = errors.array()
        res.render("reset",{arrWarnings,token})
    }else return next()
}
]

module.exports = {validatorResetPassword}