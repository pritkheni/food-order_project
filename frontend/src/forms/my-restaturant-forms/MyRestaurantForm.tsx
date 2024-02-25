import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisineSection from "./CuisineSection";

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const formSchema = z.object({
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
  menuImtem: z.array(
    z.object({
      name: z.string().min(1, "name is require in menu items"),
      price: z.coerce
        .number()
        .min(1, { message: "price is require in menu items" }),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is require" }),
});

type restaurantFormData = z.infer<typeof formSchema>;
const MyRestauratnForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuImtem: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formData: restaurantFormData) => {
    //TODO -convert formData to new FormData
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
      </form>
    </Form>
  );
};

export default MyRestauratnForm;
