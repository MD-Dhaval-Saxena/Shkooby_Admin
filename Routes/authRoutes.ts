import express, { Router } from "express";
import authMiddleware from "../Controllers/authMiddleware";
import { getUser } from "../Controllers/userController";
import  * as authController from "../Controllers/AuthController";

const router: Router = express.Router();

router.post("/registerUser", authController.registerUser);
router.post("/loginUser", authController.loginUser);
router.post("/validate", authController.validate);
// router.post("/updateProfile", updateProfile);
router.post("/viewProfile", authController.viewProfile);
router.get("/user", authMiddleware, getUser);

export default router;