import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";

export default function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="space-x-2 flex items-center">
      {isAuthenticated ? (
        <UserNameMenu />
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
}
