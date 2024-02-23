import express from "express";
import MyUserController from "../Controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
const router = express.Router();

router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, MyUserController.updateCurrentUser);

export default router;
