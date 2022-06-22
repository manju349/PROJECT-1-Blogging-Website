const blogsModel = require("../models/blogsModel")
const createBlogs = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length != 0) {
            let savedData = await blogsModel.create(data);
            res.status(201).send({ msg: savedData, msg: "blog successfully created" });
        } else res.send(400).send({ msg: "bad request" })
    }
    catch (error) {
        console.log("Server Error:", error.message)
        res.status(500).send({ msg: "Server Error", error: error.message })
    }
};

const getBlogs = async function (req, res) {
    try {
        let authorId = req.query.authorId;
        let category = req.query.category;
        let tags = req.query.tags;
        let subcategory = req.query.subcategory;

        let delOrPublish = await blogsModel.find({ $and: [{ isDeleted: false }, { isPublished: true }] })
        if (!delOrPublish)
            return res.status(404).send({ status: false, msg: "No such user exists" });
        res.status(200).send({ status: true, data: delOrPublish })

        let userFilter = await blogsModel.find({ $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory }] }).populate("authorId")
        if (!userFilter)
            return res.status(404).send({ status: false, msg: "No such user exists" });
        res.status(200).send({ status: true, data: userFilter });
    }
    catch (error) {
        console.log("Server Error:", error.message)
        res.status(500).send({ msg: "Server Error", error: error.message })
    }
};


const deleteBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId
        if (blogId.length < 24) {
        }

        let validBlogId = await blogsModel.findById(blogId)
        if (!validBlogId) {
            return res.status(404).send({ msg: "blog id not present" })
        }

        let blogDelete = await blogsModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true })
        if (blogDelete.isDeleted == true) {
            return res.status(200).send({ status: true, msg: "blog is deleted" })
        }
    }
    catch (error) {
        console.log("server error", error.message)
        res.satus(500).send({ msg: "server error", error: error.message })
    }

}


const queryDeleted = async function (req, res) {
    try {
        let data = req.query;
        let blog = req.query.blogId;

        let valid = await blogsModel.findOne(data);
        if (!valid) {
            return res.status(404).send({ status: false, msg: "Data doesn't exit!!" })
        }
        
        if (Object.values(data).length <= 0) {
            return res.status(400).send({ status: false, msg: "Input Missing" });
        }

        let deleted = await blogsModel.findOneAndUpdate(data, { isDeleted: true }, { new: true });
        if (deleted.isDeleted == true) {
            let update = await blogsModel.findOneAndUpdate({ _id: blog }, { deletedAt: data});
        }
        if (deleted.isDeleted == false) {
            let update = await blogsModel.findOneAndUpdate({ _id: blog }, { deletedAt: null });
        }
        return res.status(200).send({ status: true, data: deleted });
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
module.exports.queryDeleted = queryDeleted;
module.exports.createBlogs = createBlogs
module.exports.getBlogs = getBlogs
module.exports. deleteBlogs = deleteBlogs