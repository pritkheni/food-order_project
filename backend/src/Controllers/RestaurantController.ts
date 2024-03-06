import { Request, Response } from "express";
import {
  restaurantParams,
  searchParmsValidation,
} from "../middleware/validation";
import Restaurant from "../models/restaurnat";

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const resp = restaurantParams.safeParse(req.params);
    if (!resp.success)
      return res.status(400).json({ message: "please pase messing perameter" });
    const restaurnantId = resp.data.restaurantId;
    console.log("====================================");
    console.log(restaurnantId);
    console.log("====================================");
    const restaurant = await Restaurant.findOne({ _id: restaurnantId });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const serachRestaurant = async (req: Request, res: Response) => {
  try {
    console.log(`visit serahc resaturnat`);

    const resp = searchParmsValidation.safeParse(req.params);
    if (!resp.success)
      return res.status(400).json({ message: "please pase messing perameter" });
    const city = resp.data.city;
    console.log(city);
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;
    let query: any = {};
    query["city"] = { $regex: new RegExp(city, "i") };
    console.log(query);

    const cityCheck = await Restaurant.countDocuments(query);
    console.log(cityCheck);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }
    if (selectedCuisines) {
      const cuisineArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisines"] = { $all: cuisineArray };
    }
    if (searchQuery) {
      const searchRegx = new RegExp(searchQuery, "i");
      query["$or"] = [
        {
          restaurantName: searchRegx,
        },
        {
          cuisines: { $in: [searchRegx] },
        },
      ];
    }
    console.log(query);
    console.log(sortOption);

    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const restaurnats = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();
    const total = await Restaurant.countDocuments(query);
    const response = {
      data: restaurnats,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  serachRestaurant,
  getRestaurant,
};
