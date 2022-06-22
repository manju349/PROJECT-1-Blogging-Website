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

// - Returns all blogs in the collection that aren't deleted and are published
// - Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure) 
// - If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure) 
// - Filter blogs list by applying filters. Query param can have any combination of below filters.
//   - By author Id
//   - By category
//   - List of blogs that have a specific tag
//   - List of blogs that have a specific subcategory
// example of a query url: blogs?filtername=filtervalue&f2=fv2

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
            let update = await blogsModel.findOneAndUpdate({ _id: blog }, { deletedAt: data });
        }
        if (deleted.isDeleted == false) {
            let update = await blogsModel.findOneAndUpdate({ _id: blog }, { deletedAt: " " });
        }
        return res.status(200).send({ status: true, data: deleted });
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


const updateBlogs = async function (req, res) {

    try {
        let BlogId = req.params.blogId
        let userData = req.body

        if (Object.values(userData).length <= 0) {
            return res.status(400).send({ status: false, msg: "Input Missing" });
        }
        let { body, title, tags, subcategory, isPublished, isDeleted } = userData

        if (BlogId.length < 24) {
            return res.status(403).send({ msg: "enter valid blog id" })
        }

        let user = await blogsModel.findById(BlogId)
        if (!user) {
            return res.status(404).send({ status: false, msg: "no blog exist" })
        }
        let updateNewBlog = await blogsModel.findByIdAndUpdate({ _id: BlogId }, {

            $set: { body: body, title: title, isPublished: isPublished, isDeleted: isDeleted },
            $push: { tags: tags, subcategory: subcategory },

        }, { new: true });

        if (updateNewBlog.isPublished == true) {
            let update = await blogsModel.findOneAndUpdate({ _id: BlogId }, { publishedAt: new String(Date()) })
        }

        if (updateNewBlog.isPublished == false) {
            let update = await blogsModel.findOneAndUpdate({ _id: BlogId }, { publishedAt: null })
        }

        if (updateNewBlog.isDeleted == true) {
            res.status(404).send({ status: false, msg: "blog not found" })
        }

        if (updateNewBlog.isDeleted == false) {
            let update = await blogsModel.findOneAndUpdate({ _id: BlogId }, { deletedAt: new String(Date()) })
        }
        return res.status(200).send({ status: true, data: updateNewBlog, msg: "blog updated successfuly" })
    }
    catch (error) {
        console.log("server error", error.message)
        res.satus(500).send({ msg: "server error", error: error.message })
    }
}

module.exports.updateBlogs = updateBlogs
module.exports.queryDeleted = queryDeleted;
module.exports.createBlogs = createBlogs
module.exports.getBlogs = getBlogs
module.exports.deleteBlogs = deleteBlogs