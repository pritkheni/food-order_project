import { Restaurant } from "@/types";
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
