import { Router } from "express";
import { createBlogPost } from "../controllers/blog.controller";
import authenticate from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createBlogPost);

export default router;
