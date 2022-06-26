const authorModel = require('../models/authorsModel')
const jwt = require("jsonwebtoken")
let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        if (!isValid(author.fname)) return res.status(400).send({ status: false, msg: "first name is Required" })

        if (!isValid(author.lname)) return res.status(400).send({ status: false, msg: "last name is Required" })
        
        if (!isValid(author.title)) return res.status(400).send({ status: false, msg: "title is Required" })
<<<<<<< HEAD
        if (author.title!=="Mr"&& author.title!=="Mrs"&&author.title!=="Miss") return res.status(400).send({ status: false, msg: "title should be Mr, Mrs or Miss" })
=======

        if (author.title !=="Mr"&& author.title !=="Mrs"&&author.title !=="Miss") return res.status(400).send({ status: false, msg: "title should be Mr Mrs or Miss" })
>>>>>>> ca2bdd7d5c4a5aacd494bd042829eacd19af31c8

        if (!isValid(author.password)) return res.status(400).send({ status: false, msg: "password is Required" })

        if (!isValid(author.email)) return res.status(400).send({ status: false, msg: "email is Required" })
        let checkMail = regex.test(author.email) 
        if (checkMail == false ) return res.status(400).send({ status: false, msg: "email is not valid" })

        if (Object.keys(author).length != 0) {
            let authorCreated = await authorModel.create(author)
<<<<<<< HEAD
            res.status(201).send({ msg: "author successfully created", data: authorCreated  })
=======
            res.status(201).send({ msg: "author successfully created", data: authorCreated })
>>>>>>> ca2bdd7d5c4a5aacd494bd042829eacd19af31c8
        } else res.send(400).send({ msg: "bad request" })
    }
    catch (error) {
        console.log("Server Error:", error.message)
        res.status(500).send({ msg: "Server Error", error: error.message })
    }
}
module.exports.createAuthor= createAuthor


const authorLogin = async function(req, res){
    try{
        let authorName = req.body.email;
        let password = req.body.password;

        if (!authorName){
            return res.status(400).send({msg: "enter email id"})
        }

        if (!password){
            return res.status(400).send({msg: "enter the password"})
        }

        let user = await authorModel.findOne({email: authorName, password: password});
        if(!user){
            return res.status(404).send({status: false, msg:"User Name or the Password is not correct"});
        }

        let token = jwt.sign(
            {
                authorId: user._id.toString()
            },
            "room-9"
        );
        res.setHeader("x-api-key", token);
        return res.status(201).send({status: true, token: token })
    }
    catch (error){
        console.log("Server Error:", error.message)
        res.status(500).send({ msg: "Server Error", error: error.message })
    }
}
module.exports.authorLogin = authorLogin