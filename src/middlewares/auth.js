const jwt = require('jsonwebtoken')
const blogsModel = require("../models/blogsModel")

// AUTHENTICATION BY VERIFYING TOKEN GENERATED DURING LOGIN
const authentication = function(req, res, next){
    try{
        let token = req.headers["x-api-key"]
        if(!token){
        res.status(401).send({status : false, msg: "token is required"})
        }

        let decodedToken = jwt.verify(token, "room-9")
        if (!decodedToken) {
        return res.status(403).send({status : false, msg: "token is invalid"})
        }
        next()
    }
    catch (error){
        console.log(error)
        res.status(500).send({msg : error})
    }
}
module.exports.authentication = authentication


// AUTHORISATION USING AUTHOR ID IN TOKEN AND BLOGS (TOKEN IN PATH PARAMS)
const Authorisation1 = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ Error: "Token must be present" });
        }
        let decodedToken = jwt.verify(token, "room-9")
        let blogId = req.params.blogId;
        if (!blogId){
            return res.status(400).send({msg: "enter blog id"})
        }

        let decoded = decodedToken.authorId
        let blog = await blogsModel.findById(blogId);
        if (!blog) {
            return res.status(404).send({status: false, msg: "Blog doesn't exist"});
        }
        let author = blog.authorId.toString()
        console.log(author)
        if (author != decoded) {
            return res.status(401).send({status: false, msg: "Not Authorised!"})
        }
        next()
    }
    catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}
module.exports.Authorisation1 = Authorisation1;


// AUTHORISATION USING AUTHOR ID IN TOKEN AND BLOGS (TOKEN IN QUERY PARAMS)
const Authorisation2 = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ Error: "Token must be present" });
        }
        let decodedToken = jwt.verify(token, "room-9")
        let blogId = req.query.blogId;
        if (!blogId){
            return res.status(400).send({msg: "enter blog id"})
        }

        let decoded = decodedToken.authorId
        let blog = await blogsModel.findById(blogId);
        if (!blog) {
            return res.status(404).send({status: false, msg: "Blog doesn't exist"});
        }
        let author = blog.authorId.toString()
        console.log(author)
        if (author != decoded) {
            return res.status(401).send({status: false, msg: "Not Authorised!"})
        }
        next()
    }
    catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}

module.exports.Authorisation2=Authorisation2

