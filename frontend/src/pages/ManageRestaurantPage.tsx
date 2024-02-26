import {
  useCreateMyRestaurnat,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyResaturnatApi";
import MyRestauratnForm from "@/forms/my-restaturant-forms/MyRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateMyRestaurnat();
  const { restaurant, isLoading: isRestaurantLoading } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const isEditing = !!restaurant;
  //give thruty value of restaurant if there is restaurant it give true eg. !(!restaurant)
  if (isRestaurantLoading) return <span>Loading..</span>;
  return (
    <div className="flex-1">
      <MyRestauratnForm
        restaurant={restaurant}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={isLoading || isUpdateLoading}
      />
    </div>
  );
}
