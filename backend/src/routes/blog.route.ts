import { Router } from "express";
import {
  createBlogPost,
  deleteBlog,
  getAllBlogPosts,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller";
import authenticate from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createBlogPost);
router.get("/", authenticate, getAllBlogPosts);
router.get("/:id", authenticate, getBlogById);
router.patch("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);

export default router;
