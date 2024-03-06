import cors from "cors";
import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./Routes/MyUserRoute";
import myRestaurantRoute from "./Routes/MyRestaurantRoute";
import restaurnatRoute from "./Routes/RestaurnatRoute";
import { v2 as cloudinary } from "cloudinary";
import orderRoutes from "./Routes/OrderRoutes";
mongoose.connect(process.env.DB_URL as string).then(() => {
  console.log(`connected to db`);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "helth OK!" });
});
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurnatRoute);
app.use("/api/order", orderRoutes);
app.listen(7000, () => {
  console.log(`server started on localhost:7000`);
});
