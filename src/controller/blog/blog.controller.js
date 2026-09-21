// controllers/blog.controller.js
import expressAsyncHandler from "express-async-handler";
import { Blog } from "../../models/blog.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.js";
import {
  createBlogValidation,
  updateBlogValidation,
} from "../../validators/blog.validation.js";

// ✅ CREATE BLOG
export const createBlog = expressAsyncHandler(async (req, res, next) => {
  const { error } = createBlogValidation(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  const blog = await Blog.create(req.body);

  return new ApiResponse(201, "Blog created successfully", blog).send(res);
});

// ✅ GET ALL BLOGS
export const getBlogs = expressAsyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  return new ApiResponse(200, "Blogs fetched successfully", blogs).send(res);
});

// ✅ UPDATE BLOG
export const updateBlog = expressAsyncHandler(async (req, res, next) => {
  const { error } = updateBlogValidation(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new CustomError("Blog not found", 404));
  }

  // 🔐 Optional: Ownership check
  if (blog.createdBy._id.toString() !== req.body.createdBy?._id) {
    return next(new CustomError("Unauthorized to update this blog", 403));
  }

  Object.assign(blog, req.body);
  await blog.save();

  return new ApiResponse(200, "Blog updated successfully", blog).send(res);
});

// ✅ DELETE BLOG
export const deleteBlog = expressAsyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new CustomError("Blog not found", 404));
  }

  // 🔐 Optional: Ownership check
  // (Better to use req.myUser if you have auth middleware)
  // if (blog.createdBy._id.toString() !== req.myUser._id.toString()) ...

  await blog.deleteOne();

  return new ApiResponse(200, "Blog deleted successfully").send(res);
});