import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisineSection from "./CuisineSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const formSchema = z
  .object({
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
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is require" }).optional(),
  })
  .refine((date) => date.imageUrl || date.imageFile, {
    message: "Either image URL or image File must be provides",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;
const MyRestauratnForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  useEffect(() => {
    if (!restaurant) {
      return;
    }
    form.reset(restaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });
    if (formDataJson.imageFile)
      formData.append(`imageFile`, formDataJson.imageFile);
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default MyRestauratnForm;
