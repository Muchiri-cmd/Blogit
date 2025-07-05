import { Router } from "express";
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogById,
} from "../controllers/blog.controller";
import authenticate from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createBlogPost);
router.get("/", authenticate, getAllBlogPosts);
router.get("/:id", authenticate, getBlogById);

export default router;
