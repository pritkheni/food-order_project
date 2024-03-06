import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeCart: (cartItem: CartItem) => void;
};
export default function OrderSummary({
  restaurant,
  cartItems: cardItems,
  removeCart,
}: Props) {
  const getTotalCost = () => {
    const totalPrice = cardItems.reduce(
      (acc, current) => acc + current.quantity * current.price,
      0
    );
    const totalChargablePrice = totalPrice + restaurant.deliveryPrice;
    return totalChargablePrice;
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>₹{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cardItems.map((cart) => (
          <div className="flex justify-between">
            <span className="flex gap-1">
              <Badge variant="outline">{cart.quantity}</Badge>
              <span>{cart.name}</span>
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeCart(cart)}
              />
              ₹{(cart.price * cart.quantity).toFixed(0)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{restaurant.deliveryPrice}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}
