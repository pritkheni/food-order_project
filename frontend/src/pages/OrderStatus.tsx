import { useGetMyOrder } from "@/api/OrderApi";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrdersStatusHeader from "@/components/OrdersStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function OrderStatus() {
  const { orders, isLoading } = useGetMyOrder();
  if (isLoading) {
    return "Loading...";
  }
  if (!orders || !orders.length) return <div> No orders found</div>;
  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg ">
          <OrdersStatusHeader order={order} />
          <div className="grid space-y-10 md:grid-cols-2">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                alt=""
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}
