import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

type CreateUserRequest = { auth0Id: string; email: string };

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log("base url");
  console.log(API_BASE_URL);
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessTocker = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessTocker}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Failed to create user");
  };
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
