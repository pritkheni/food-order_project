import { Link } from "react-router-dom";
import MobileSheet from "./MobileSheet";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="flex mx-auto justify-between items-center container">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tighter text-orange-500"
        >
          Food Corner
        </Link>
        <div className="md:hidden">
          <MobileSheet />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
}
