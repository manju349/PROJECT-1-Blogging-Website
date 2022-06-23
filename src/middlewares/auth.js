const jwt = require('jsonwebtoken')
const authorsModel = require("../models/authorsModel")
const booksModel = require("../models/blogsModel")

const authentication = function(req, res, next){
    try{
        let token = req.headers["x-api-key"]
        if(!token){
        res.status(401).send({status : false, msg: "token is required"})
        }

        let decodedToken = jwt.verify(token, "room-9")
        if (!decodedToken) {
        return res.status(401).send({status : false, msg: "token is invalid"})
        }
        next()
    }
    catch (error){
        console.log(error)
        res.status(401).send({msg : error})
    }
}

module.exports.authentication = authentication


const authorise = async function (req,res,next){

    let token = req.headers["x-api-key"];
    if (!token) return res.send({status: false, msg: "token is missing"})

    let decodedtoken = jwt.verify(token, "room-9");
    if(!decodedtoken) return res.send({ status: false, msg: "invalid token"})


    let blogId = req.query.blogId
    if (blogId.length < 24){
        return res.send({msg: "enter valid blog id"})
    }

    let blog = await blogsModel.findById(blogId)
    if (!blog){
        return res.send("blog doesnt exist")
    }

    let decoded = decodedtoken.authorId
    let author = blog.authorId
    if (author != decoded){
        return res.send("not authorised")
    }
    next ()
}

module.exports.authorise=authorise