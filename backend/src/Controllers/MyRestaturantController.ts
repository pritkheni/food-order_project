import { Request, Response } from "express";
import Restaurant from "../models/restaurnat";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { validateMyRestaurantRequest } from "../middleware/validation";
import Order from "../models/order";

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

const getMyRestaturantOrder = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");
    res.json(orders);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "something went wrong while fetching orders" });
  }
};
const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findOne({ _id: orderId });
    if (!order) return res.status(404).json({ message: "order not found" });
    const restaturant = await Restaurant.findById(order.restaurant);
    if (restaturant?.user?._id.toString() !== req.userId) {
      return res.status(401).send();
    }
    order.status = status;
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "something went wrong while updating order" });
  }
};

export default {
  createMyResturent,
  getMyRestaurnat,
  updateMyRestaurant,
  getMyRestaturantOrder,
  updateOrderStatus,
};

async function uploadImageUrl(image: Express.Multer.File) {
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
}
