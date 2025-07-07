import { Router } from "express";
import { updateUser } from "../controllers/user.controller";
import authenticate from "../middleware/auth.middleware";

const router = Router();

router.patch("/", authenticate, updateUser);

export default router;
