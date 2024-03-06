import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
export type CheckoutSessionRequest = {
  cartItem: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    country: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};
export const useCreateCheckOutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }
    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return {
    createCheckoutSession,
    isLoading,
  };
};

export const useGetMyOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const createGetMyOrderRequest = async (): Promise<Order[]> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get order");
    }
    return response.json();
  };
  const {
    data: orders,
    error,
    isLoading,
  } = useQuery("getMyOrder", createGetMyOrderRequest, {
    refetchInterval: 5000,
  });
  if (error) {
    toast.error("error while fetching order");
  }
  return {
    orders,
    isLoading,
  };
};
