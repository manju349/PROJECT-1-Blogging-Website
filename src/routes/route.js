const express = require('express');
const router = express.Router();


const authorController = require("../controllers/authorsControllers")
const blogsController = require("../controllers/blogsControllers")
const { authentication, Authorisation1, Authorisation2} = require("../middlewares/auth")



router.post("/authors", authorController.createAuthor)
router.post("/blogs",  authentication,blogsController.createBlogs)
router.post("/login", authorController.authorLogin)
router.get("/blogs", authentication, blogsController.getBlogs)
router.put("/blogs/:blogId", authentication, Authorisation1,  blogsController.updateBlogs)
router.delete("/blogs/:blogId", authentication, Authorisation1, blogsController.deleteBlogs)
router.delete("/blogs", authentication, Authorisation2, blogsController.queryDeleted)

module.exports = router;