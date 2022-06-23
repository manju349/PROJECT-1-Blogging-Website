const authorModel = require('../models/authorsModel')
const jwt = require("jsonwebtoken")

const createAuthor= async function(req,res){
    try{
    let author=req.body
    if (author) {
    let authorCreated= await authorModel.create(author)
    res.status(201).send({data: authorCreated, msg:"author successfully created"})
    }else res.send(400).send({msg: "bad request"})
    }
    catch (error){
        console.log("Server Error:", error.message)
        res.status(500).send({ msg: "Server Error", error: error.message })
    }
}
module.exports.createAuthor= createAuthor


const authorLogin = async function(req, res){
    try{
        let authorName = req.body.emailId;
        let password = req.body.password;

        let user = await authorModel.findOne({email: authorName, password: password});
        if(!user){
            return res.status(404).send({status: false, msg:"User Name or the Password is not correct"});
        }

        let token = jwt.sign(
            {
                authorId: author._id.toString()
            },
            "room-9"
        );
        res.setHeader("x-api-key", token);
        return res.status(201).send({status: ture, token: token })
    }
    catch (error){
        console.log("Server Error:", error.message)
        res.status(500).send({ msg: "Server Error", error: error.message })
    }
}
module.exports.authorLogin = authorLogin