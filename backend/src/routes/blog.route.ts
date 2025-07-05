import { Router } from "express";
import {
  createBlogPost,
  getAllBlogPosts,
} from "../controllers/blog.controller";
import authenticate from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createBlogPost);
router.get("/", authenticate, getAllBlogPosts);

export default router;
