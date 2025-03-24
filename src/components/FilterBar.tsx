import React from "react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Home,
  Tent,
  Building,
  Warehouse,
  Sailboat,
  Castle,
  Trees,
  Snowflake,
  Flame,
  Waves,
  Coffee,
  Utensils,
} from "lucide-react";

interface FilterChip {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface FilterBarProps {
  selectedFilters?: string[];
  onFilterChange?: (filterId: string) => void;
}

const FilterBar = ({
  selectedFilters = [],
  onFilterChange = () => {},
}: FilterBarProps) => {
  const filterChips: FilterChip[] = [
    { id: "houses", label: "Houses", icon: <Home className="w-4 h-4" /> },
    {
      id: "apartments",
      label: "Apartments",
      icon: <Building className="w-4 h-4" />,
    },
    { id: "cabins", label: "Cabins", icon: <Warehouse className="w-4 h-4" /> },
    { id: "camping", label: "Camping", icon: <Tent className="w-4 h-4" /> },
    { id: "boats", label: "Boats", icon: <Sailboat className="w-4 h-4" /> },
    { id: "castles", label: "Castles", icon: <Castle className="w-4 h-4" /> },
    {
      id: "countryside",
      label: "Countryside",
      icon: <Trees className="w-4 h-4" />,
    },
    { id: "skiing", label: "Skiing", icon: <Snowflake className="w-4 h-4" /> },
    { id: "tropical", label: "Tropical", icon: <Flame className="w-4 h-4" /> },
    {
      id: "beachfront",
      label: "Beachfront",
      icon: <Waves className="w-4 h-4" />,
    },
    {
      id: "breakfast",
      label: "Breakfast",
      icon: <Coffee className="w-4 h-4" />,
    },
    { id: "dining", label: "Dining", icon: <Utensils className="w-4 h-4" /> },
  ];

  const handleFilterClick = (filterId: string) => {
    onFilterChange(filterId);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <ScrollArea className="w-full">
        <div className="flex items-center gap-4 px-6 py-4 overflow-x-auto">
          {filterChips.map((filter) => (
            <Button
              key={filter.id}
              variant={
                selectedFilters.includes(filter.id) ? "default" : "outline"
              }
              size="sm"
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${selectedFilters.includes(filter.id) ? "bg-black text-white" : "hover:bg-gray-100"}`}
              onClick={() => handleFilterClick(filter.id)}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FilterBar;
