import { z } from "zod";
export const updateUserValidation = z.object({
  name: z.string().min(1, { message: "name can not be empty" }),
  addressLine1: z.string().min(1, { message: "address can not be empty" }),
  city: z.string().min(1, { message: "city can not be empty" }),
  country: z.string().min(1, { message: "country can not be empty" }),
});

export const validateMyRestaurantRequest = z.object({
  restaurantName: z.string({
    required_error: "restaurant name is require",
  }),
  country: z.string({
    required_error: "country is require",
  }),
  city: z.string({
    required_error: "city is require",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is require",
    invalid_type_error: "must be valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "delivery price is require",
    invalid_type_error: "must be valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one cuisine",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is require in menu items"),
      price: z.coerce
        .number()
        .min(1, { message: "price is require in menu items" }),
    })
  ),
});

export const searchParmsValidation = z.object({
  city: z.string().min(1, { message: "city can not be empty" }),
});
