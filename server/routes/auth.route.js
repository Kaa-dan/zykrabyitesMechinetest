import express from "express";
import { signIn, signUp,getUserInfo } from "../controller/auth.controller.js";
import verifyUser from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", signUp);
router.post("/sign", signIn);
router.get("/info",verifyUser,getUserInfo)
export default router;
