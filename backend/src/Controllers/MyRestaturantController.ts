import { Request, Response } from "express";
import Restaurant from "../models/restaurnat";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { validateMyRestaurantRequest } from "../middleware/validation";

const createMyResturent = async (req: Request, res: Response) => {
  try {
    const existRestaturnat = await Restaurant.findOne({ user: req.userId });
    const { success } = validateMyRestaurantRequest.safeParse(req.body);
    //409 means duplicate there record already exist
    if (!success) return res.status(400).json({ message: "wrong input" });
    if (existRestaturnat)
      return res.status(409).json({ message: "User restaturnt already exist" });
    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer.toString("base64"));
    const dataURI = `data:${image.mimetype};base64;${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    const restaurnat = new Restaurant(req.body);
    restaurnat.imageUrl = uploadResponse.url;
    restaurnat.user = new mongoose.Types.ObjectId(req.userId);
    restaurnat.lastUpdated = new Date();
    await restaurnat.save();
    res.status(201).send(restaurnat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMyResturent,
};
