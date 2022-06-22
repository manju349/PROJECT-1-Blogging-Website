const authorModel = require('../models/authorsModel')

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
