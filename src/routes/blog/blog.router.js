// routes/blog.router.js
import express from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../../controller/blog/blog.controller.js";

const router = express.Router();

router.post("/create", createBlog);
router.get("/", getBlogs);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;