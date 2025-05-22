import { Router } from "express";
import { basicUsageController } from "../controllers/basic-usage.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/basic-usage", asyncHandler(basicUsageController))

export default router;