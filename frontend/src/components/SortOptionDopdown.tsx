import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
type Props = {
  onChange: (option: string) => void;
  sortOption: string;
};
type SortType = {
  label: string;
  value: string;
};
const SORT_OPRION: Array<SortType> = [
  { label: "best match", value: "bestMatch" },
  { label: "Delivery price", value: "deliveryPrice" },
  { label: "Estimated delivery time", value: "estimatedDeliveryTime" },
];
export default function SortOptionDopdown({ onChange, sortOption }: Props) {
  const curretnOption =
    SORT_OPRION.find((option) => option.value === sortOption)?.label ||
    SORT_OPRION[0].label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sorted By:{curretnOption}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPRION.map((item) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
