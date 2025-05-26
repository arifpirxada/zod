import { Router } from "express";
import {  loginController, logoutController, signupController } from "../controllers/registration.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/signup", asyncHandler(signupController))
router.post("/login", asyncHandler(loginController))
router.post("/logout", asyncHandler(logoutController))

export default router;