import { Request, Response } from "express";
import Restaurant from "../models/restaurnat";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { validateMyRestaurantRequest } from "../middleware/validation";

const getMyRestaurnat = async (req: Request, res: Response) => {
  try {
    const restaurnat = await Restaurant.findOne({ user: req.userId });
    if (!restaurnat)
      return res.status(404).json({ message: "resaturnat not found" });
    res.json(restaurnat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createMyResturent = async (req: Request, res: Response) => {
  try {
    const { success } = validateMyRestaurantRequest.safeParse(req.body);
    const existRestaturnat = await Restaurant.findOne({ user: req.userId });
    console.log(existRestaturnat);

    //409 means duplicate there record already exist
    if (!success) return res.status(400).json({ message: "wrong input" });
    if (existRestaturnat) {
      return res.status(409).json({ message: "User restaturnt already exist" });
    }
    const imageUrl = await uploadImageUrl(req.file as Express.Multer.File);
    const restaurnat = new Restaurant(req.body);
    restaurnat.imageUrl = imageUrl;
    restaurnat.user = new mongoose.Types.ObjectId(req.userId);
    restaurnat.lastUpdated = new Date();
    await restaurnat.save();
    res.status(201).send(restaurnat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    console.log(`update my user`);
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant)
      return res.status(404).json({ message: "restaurant not found" });
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();
    if (req.file) {
      const imageUrl = await uploadImageUrl(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMyResturent,
  getMyRestaurnat,
  updateMyRestaurant,
};

async function uploadImageUrl(image: Express.Multer.File) {
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
}
