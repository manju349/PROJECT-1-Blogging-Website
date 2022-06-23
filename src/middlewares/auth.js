const jwt = require('jsonwebtoken')
// const authorsModel = require("../models/authorsModel")
const blogsModel = require("../models/blogsModel")

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


const Authorisation1 = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ Error: "Enter x-api-key In Header" });
        }
        let decodedToken = jwt.verify(token, "room-9")
        let blogId = req.params.blogId;

        // if (blogId.length < 24) {
        //     return res.status(404).send({ msg: "Enter Valid Blog-Id" });
        // }
        let decoded = decodedToken.authorId
        let blog = await blogsModel.findById(blogId);
        if (!blog) {
            return res.status(404).send("Blog doesn't exist");
        }
        let author = blog.authorId.toString()
        console.log(author)
        if (author != decoded) {
            return res.status(404).send("Not Authorised!!")
        }
        next()
    }
    catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}
module.exports.Authorisation1 = Authorisation1;

const Authorisation2 = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ Error: "Enter x-api-key In Header" });
        }
        let decodedToken = jwt.verify(token, "room-9")
        // let blogId = req.query.blogId;

        // // if (blogId.length < 24) {
        // //     return res.status(404).send({ msg: "Enter Valid Blog-Id" });
        // // }
        // let decoded = decodedToken.authorId
        // let blog = await blogsModel.findById(blogId);
        // if (!blog) {
        //     return res.status(404).send("Blog doesn't exist");
        // }
        // let author = blog.authorId.toString()
        // console.log(author)
        // if (author != decoded) {
        //     return res.status(404).send("Not Authorised!!")
        // }
        next()
    }
    catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}

module.exports.Authorisation2=Authorisation2