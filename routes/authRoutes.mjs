import express from "express";
const router = express.Router();

import { register,login,updateUser ,testController } from "../controllers/authController.mjs";
import authenticateUser from '../middleware/auth.mjs';

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/updateUser").patch(authenticateUser,updateUser)

router.route("/test").get(testController)

export default router;
