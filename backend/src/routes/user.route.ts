import { Router } from "express";
import { updatePassword, updateUser } from "../controllers/user.controller";
import authenticate from "../middleware/auth.middleware";

const router = Router();

router.patch("/", authenticate, updateUser);
router.patch("/password", authenticate, updatePassword);

export default router;
