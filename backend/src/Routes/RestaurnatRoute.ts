import express from "express";
import RestaurantController from "../Controllers/RestaurantController";
const router = express.Router();

router.get("/:restaurantId",RestaurantController.getRestaurant);
router.get("/search/:city", RestaurantController.serachRestaurant);

export default router;
