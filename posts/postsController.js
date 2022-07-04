const { addOneComment } = require("./postsModel")
const {matchedData} = require("express-validator")

const addComment = async(req,res,next)=>{
    const cleanBody = matchedData(req)
    const dbResponse = await addOneComment({userid: req.token.id,...cleanBody})
    dbResponse instanceof Error ? next(dbResponse) : res.status(201).json({message: `Post created by ${req.token.name}`})
}

module.exports = {addComment}