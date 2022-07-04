const {check,validationResult} = require("express-validator")

const validatorCreateUser = [
check("username")
.trim()
.exists().withMessage("username field required")
.notEmpty().withMessage("username must not be empty")
.isLength({min:5, max:15}).withMessage("Username characters min 5, max 15"),
check("password")
.exists().withMessage("password field required")
.notEmpty().withMessage("password must not be empty")
.isLength({min:5,max:255}).withMessage("Password characters min 5"),
check("completedName")
.exists().withMessage("Completed Name field required")
.notEmpty().withMessage("Completed Name must not be empty")
.isLength({min:8,max:30}).withMessage("Completed Name characters min: 15,max: 30")
.isAlpha('es-ES',{ignore: ' '}).withMessage("Only letters"),
check("savingsBank")
.trim()
.exists().withMessage("Savings Bank field required")
.notEmpty().withMessage("Savings Bank must not be empty")
.isLength({min:8,max:8}).withMessage("Savings Bank must have 8 digits")
.isNumeric({no_symbols:true}).withMessage("Savings Bank only accepts numbers"),
check("email")
.trim()
.exists().withMessage("email field required")
.notEmpty().withMessage("email must not be empty")
.isLength({min:15,max:30}).withMessage("Email characters min 15, max 30")
.isEmail()
,
(req,res,next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(400).json({errors:error.array()})
    }
}
]


module.exports = {validatorCreateUser}