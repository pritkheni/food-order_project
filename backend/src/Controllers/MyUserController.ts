import { Request, Response } from "express";
import User from "../models/users";
import { updateUserValidation } from "../middleware/validation";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existUser = await User.findOne({ auth0Id });
    if (existUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser.toObject());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const resp = updateUserValidation.safeParse(req.body);
    if (!resp.success) return res.status(400).json(resp.error);
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const curretUser = await User.findOne({ _id: req.userId });
    if (!curretUser) return res.status(404).json({ message: "User not found" });
    res.json(curretUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
};
