import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

export const useSearchRestaurnat = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;
    const parmas = new URLSearchParams();
    parmas.set("searchQuery", searchState.searchQuery);
    parmas.set("page", searchState.page.toString());
    parmas.set("selectedCuisines", searchState.selectedCuisines.join(","));
    console.log(searchState.sortOption);
    parmas.set("sortOption", searchState.sortOption);
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${parmas.toString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };
  const { data: result, isLoading } = useQuery(
    ["searchRestaurnat", searchState],
    createSearchRequest,
    { enabled: !!city }
  );
  return {
    result,
    isLoading,
  };
};

export const useGetRestaurant = (restaurantId?: string) => {
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const getRestaurnatRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };
  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurnatRequest,
    { enabled: !!restaurantId }
  );

  return {
    restaurant,
    isLoading,
  };
};
