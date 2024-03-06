import {
  CheckoutSessionRequest,
  useCreateCheckOutSession,
} from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemCard from "@/components/MenuItemCard";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function DetailPage() {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCardItem = sessionStorage.getItem(`cardItems-${restaurantId}`);
    return storedCardItem ? JSON.parse(storedCardItem) : [];
  });
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckOutSession();
  const onCheckOut = async (userFormData: UserFormData) => {
    if (!restaurant) return;
    console.log("userFormData", userFormData);
    const checkoutData: CheckoutSessionRequest = {
      cartItem: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant?._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };
  const addToCart = (item: MenuItem) => {
    setCartItems((prevCartItems) => {
      const exist = prevCartItems.find((cart) => cart._id === item._id);
      let updatedCartItems: CartItem[];
      if (exist) {
        updatedCartItems = prevCartItems.map<CartItem>((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          { _id: item._id, name: item.name, price: item.price, quantity: 1 },
        ];
      }

      sessionStorage.setItem(
        `cardItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeCart = (cartItem: CartItem) => {
    setCartItems((prevCartItem) => {
      const updatedCartItem = prevCartItem.filter(
        (item) => item._id !== cartItem._id
      );
      sessionStorage.setItem(
        `cardItems-${restaurantId}`,
        JSON.stringify(updatedCartItem)
      );
      return updatedCartItem;
    });
  };
  if (isLoading || !restaurant) {
    return <span>Loading...</span>;
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-1 flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          {restaurant.menuItems.map((menu) => (
            <MenuItemCard menuItem={menu} addToCart={addToCart} />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeCart={removeCart}
            />
            <CardFooter>
              <CheckoutButton
                disable={cartItems.length === 0}
                onCheckOut={onCheckOut}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
