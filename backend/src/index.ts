import cors from "cors";
import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL as string).then(() => {
  console.log(`connected to db`);
});
const app = express();
app.use(express.json());
app.use(cors());
app.get("/test", async (req: Request, res: Response) => {});
app.listen(7000, () => {
  console.log(`server started on localhost:7000`);
});
