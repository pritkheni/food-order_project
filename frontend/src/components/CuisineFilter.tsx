import { cuisineList } from "@/config/restaurant-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};
export default function CuisineFilter({
  onChange,
  isExpanded,
  onExpandedClick,
  selectedCuisines,
}: Props) {
  const handleCuisinesReset = () => onChange([]);
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCusine = event.target.value;
    const isChecked = event.target.checked;
    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCusine]
      : selectedCuisines.filter((cuisine) => clickedCusine !== cuisine);

    onChange(newCuisinesList);
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelecte = selectedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  type="checkbox"
                  id={`cuisines_${cuisine}`}
                  className="hidden"
                  value={cuisine}
                  checked={isSelecte}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisines_${cuisine}`}
                  className={`flex flex-1 cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelecte
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelecte && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
      </div>
      <Button onClick={onExpandedClick} variant="link" className="mt-4 flex-1">
        {isExpanded ? (
          <span className="flex flex-row items-center">
            View Less <ChevronUp />
          </span>
        ) : (
          <span className="flex flex-row items-center">
            View More <ChevronDown />
          </span>
        )}
      </Button>
    </>
  );
}
