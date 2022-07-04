const router = require("express").Router()
const tokenAuth  = require("../middlewares/tokenAuth")
const { updateOneBalance } = require("./token_controller")


router.post("/",tokenAuth,updateOneBalance)

module.exports = router