import { Router } from "express";
import { getRecommendation } from "../controllers/aiController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/recommend", authMiddleware, getRecommendation);

export default router;
