const router = require("express").Router()
const {register,login, editUser,forgot,reset,saveNewPass} = require("./usersController")
const {validatorCreateUser} = require("../validatorsUsers/createUsers")
const uploadFile = require("../utils/handleStorage")
const { validatorResetPassword } = require("../validatorsUsers/createNewPass")

router.get("/reset/:token",reset)

router.post("/forgot-password",forgot)

router.post("/reset/:token",validatorResetPassword,saveNewPass)

router.post("/register",uploadFile.single("file"),validatorCreateUser,register)

router.post("/login",login)

router.patch("/changeUser/:savingsBank",uploadFile.single("file"),editUser)


module.exports = router;