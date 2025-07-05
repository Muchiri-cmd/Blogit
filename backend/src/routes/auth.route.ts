import { Router } from "express";
import { registerUser, loginUser,logoutUser } from "../controllers/auth.controller";
import authenticate from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser)

export default router;
