import landingImage from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFromValue: SearchForm) => {
    navigate({
      pathname: `/search/${searchFromValue.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 md:px-32">
        <h1 className="text-5xl font-bold tracking-tight text-orange-500">
          Tuck into takeway today
        </h1>
        <span className="text-xl">Food is just one click away!</span>
        <SearchBar
          placeHolder="Search by city or town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="landing" />
        <div className="flex flex-col gap-5 justify-center items-center text-center ">
          <span className="text-3xl font-bold tracking-tighter">
            Order takeway even faster
          </span>
          <span>
            Download the Food Corner App for faster ordering and personslised
            recommendation.
          </span>
          <img src={appDownload} alt="downlod img" />
        </div>
      </div>
    </div>
  );
}
