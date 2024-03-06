import {
  useCreateMyRestaurnat,
  useGetMyRestaurant,
  useGetMyRestaurantOrder,
  useUpdateMyRestaurant,
} from "@/api/MyResaturnatApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyRestauratnForm from "@/forms/my-restaturant-forms/MyRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateMyRestaurnat();
  const { restaurant, isLoading: isRestaurantLoading } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { orders } = useGetMyRestaurantOrder();
  const isEditing = !!restaurant;
  //give thruty value of restaurant if there is restaurant it give true eg. !(!restaurant)
  if (isRestaurantLoading) return <span>Loading..</span>;
  return (
    <div className="flex-1">
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 pg-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
          {orders?.map((order) => (
            <OrderItemCard order={order} />
          ))}
        </TabsContent>
        <TabsContent
          value="manage-restaurant"
          className="space-y-5 bg-gray-50 pg-10 rounded-lg"
        >
          <MyRestauratnForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isLoading || isUpdateLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
