import { Router } from "express";
import {
  getUserBlogs,
  updatePassword,
  updateUser,
  getCurrentUser,
} from "../controllers/user.controller";
import authenticate from "../middleware/auth.middleware";

const router = Router();

router.patch("/", authenticate, updateUser);
router.patch("/password", authenticate, updatePassword);
router.get("/blogs", authenticate, getUserBlogs);
router.get("/current-user", authenticate, getCurrentUser);

export default router;
