import mongoose from "mongoose";
const memuItemSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: String, require: true },
});
const restaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaturnatName: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  deliveryPrice: {
    type: Number,
    require: true,
  },
  cuisines: [
    {
      type: String,
      required: true,
    },
  ],
  menuItem: [memuItemSchema],
  imageUrl: {
    type: String,
    require: true,
  },
  lastUpdated: {
    type: Date,
    require: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;