const router = require("express").Router()
const { allUsers,oneUser,deleteUser,getAllBalance,getBalanceBySB,changeBalanceBySB,changeSbBySB,listComments} = require("./adminController");


router.get("/",allUsers)
router.get("/users/:savingsBank",oneUser)
router.get("/comments",listComments)

router.delete("/:savingsBank",deleteUser)

router.get("/balance/all",getAllBalance)
router.get("/balance/:savingsBank",getBalanceBySB)
router.patch("/balance/changeBL/:savingsBank",changeBalanceBySB)
router.patch("/balance/changeSB/:savingsBank",changeSbBySB)
module.exports = router;