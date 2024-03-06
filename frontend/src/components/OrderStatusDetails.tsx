import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
};

export default function OrderStatusDetails({ order }: Props) {

  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1} , {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
          {order.cartItems.map((cartItem) => (
            <li>
              {cartItem.name} x {cartItem.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>₹{(order.totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
}
