import { Order, OrderStatus, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useCreateMyRestaurnat = () => {
  const { getAccessTokenSilently } = useAuth0();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const createMyRestaurnat = async (
    restaurnatFormData: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: restaurnatFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurnat");
    }

    return response.json();
  };
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurnat);
  if (isSuccess) {
    toast.success("Restaurant created!");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }
  return { createRestaurant, isLoading };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const getMyRestaurant = async (): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurant
  );

  return {
    restaurant,
    isLoading,
  };
  //any time use post or put use => useMustation() hooks from react-query
  //any time use fetching data only use => useQuery() hooks from react-query
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const updateMyRestaurant = async (
    updatedFormData: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updatedFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }
    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyRestaurant);
  if (isSuccess) {
    toast.success("resturant updated successfully!");
  }
  if (error) {
    toast.error("unable to update restaurant");
  }
  return {
    updateRestaurant,
    isLoading,
  };
};

export const useGetMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const createGetMyRestaurantOrderRequest = async (): Promise<Order[]> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong while fetch order");
    }
    return response.json();
  };

  const {
    data: orders,
    error,
    isLoading,
  } = useQuery("fetchMyRestaturantOrder", createGetMyRestaurantOrderRequest);
  if (error) {
    toast.error(error.toString());
  }
  return {
    orders,
    isLoading,
  };
};

export type UpdateStatusOrderRequest = {
  orderId: string;
  status: OrderStatus;
};
export const useUpdateMyRestaturantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const updateMyRestaurantOrder = async (
    updateStatusOrder: UpdateStatusOrderRequest
  ) => {
    const token = await getAccessTokenSilently();
    const respons = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrder.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrder.status }),
      }
    );
    if (!respons.ok) {
      throw new Error("something went wrong while updating status");
    }
    return respons.json();
  };
  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isSuccess,
    isError,
    reset,
  } = useMutation(updateMyRestaurantOrder);
  if (isError) {
    toast.error("enable to update order");
    reset();
  }
  if (isSuccess) {
    toast.success("Order Updated");
  }
  return { updateRestaurantStatus, isLoading };
};
