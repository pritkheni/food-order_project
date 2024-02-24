import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

export default function UserProfilePage() {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  if (isGetLoading) return <span>Loading..</span>;
  if (!currentUser) return <span> Unable to load user profile</span>;
  return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoagin={isUpdateLoading} />;
}
