import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import authenticate from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
