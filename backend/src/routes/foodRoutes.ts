import { Router } from "express";
import {
  getFoods,
  getFoodById,
  addFood,
  updateFood,
  deleteFood,
} from "../controllers/foodController"; 

const router = Router();

router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/", addFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
