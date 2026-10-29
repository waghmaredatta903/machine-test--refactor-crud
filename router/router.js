const BlogsControler = require("../controler/BlogsControler");

const  express = require("express");

const router = express.Router();

router.get("/",BlogsControler.sentBlogs);
router.get("/:id",BlogsControler.sentBlogsById);
router.post("/", BlogsControler.createBlogs );
router.patch("/:id",BlogsControler.UpdateBlogs);
router.delete("/:id",BlogsControler.RemoveBlogs);

module.exports = router;