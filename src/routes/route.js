const express = require('express');
const router = express.Router();


const authorController = require("../controllers/authorsControllers")
const blogsController = require("../controllers/blogsControllers")



router.post("/authors", authorController.createAuthor)
router.post("/blogs", blogsController.createBlogs)
router.get("/blogs", blogsController.getBlogs)
router.delete("/blogs/:blogId", blogsController.deleteBlogs)
router.delete("/blogs", blogsController.queryDeleted)
router.put("/blogs/:blogId", blogsController.updateBlogs)

module.exports = router;
