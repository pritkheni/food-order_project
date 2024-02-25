import express from "express";
import multer from "multer";
import MyRestaturantController from "../Controllers/MyRestaturantController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, //5mb
  },
});
router.post(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  MyRestaturantController.createMyResturent
);

export default router;
