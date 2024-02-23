import { z } from "zod";
export const updateUserValidation = z.object({
  name: z.string().min(1, { message: "name can not be empty" }),
  addressLine1: z.string().min(1, { message: "address can not be empty" }),
  city: z.string().min(1, { message: "city can not be empty" }),
  country: z.string().min(1, { message: "country can not be empty" }),
});
