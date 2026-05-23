import {register, login, updateProfile} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import express from "express";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;