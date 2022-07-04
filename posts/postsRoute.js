const router = require("express").Router()
const tokenAuth = require("../middlewares/tokenAuth");
const validatorCreatePost = require("../validatorsUsers/createComment");
const { addComment } = require("./postsController");

router.get("/",(req,res)=>{
    res.json("Bienvenido a la seccion de comentarios.")
})
router.post("/comments",tokenAuth,validatorCreatePost,addComment)
module.exports = router;