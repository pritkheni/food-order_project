import { Request, Response } from "express";
import { searchParmsValidation } from "../middleware/validation";

const serachRestaurant = (req: Request, res: Response) => {
  const resp = searchParmsValidation.safeParse(req.params);
  if (!resp.success)
    return res.status(400).json({ message: "please pase messing perameter" });
  const city = resp.data.city;
  const searchQuery = (req.query.searchQuery as string) || "";
  const selectedCuisine = (req.query.selectedCuisine as string) || "";
  const sortOption = (req.query.sortOptionas as string) || "lastUpdated";
  const page = parseInt(req.query.page as string) || 1;
};

export default {
  serachRestaurant,
};
