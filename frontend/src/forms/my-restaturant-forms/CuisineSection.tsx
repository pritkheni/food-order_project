import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { cuisineList } from "@/config/restaurant-config";
import CuisineCheckBoc from "./CuisineCheckBoc";

const CuisinesSection = () => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">Cuisines</div>
      <FormDescription>
        Select Cuisines that your restaurant serves
      </FormDescription>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((item, index) => (
                <CuisineCheckBoc key={index} cuisine={item} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
