import {register, login, logout, updateProfile} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import express from "express";
import { upload } from "../middleware/mutler.js";

const router = express.Router();

router.post("/register",upload,register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/updateProfile",isAuthenticated,upload,updateProfile)
export default router;