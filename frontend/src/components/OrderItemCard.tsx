import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaturantOrder } from "@/api/MyResaturnatApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};
export default function OrderItemCard({ order }: Props) {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaturantOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({ status: newStatus, orderId: order._id });
    setStatus(newStatus);
  };
  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1} ,{" "}
              {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>

          <div>
            Total:
            <span className="ml-2 font-normal">
              ₹{(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((or) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {or.quantity}
              </Badge>
              {or.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col mt-5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value: string) =>
              handleStatusChange(value as OrderStatus)
            }
          >
            <SelectTrigger id="status" className="mt-2">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
