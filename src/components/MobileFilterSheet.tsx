import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { X, Filter } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface MobileFilterSheetProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MobileFilterSheet = ({
  isOpen = false,
  onOpenChange,
}: MobileFilterSheetProps) => {
  const [priceRange, setPriceRange] = useState<number[]>([50, 500]);

  const propertyTypes: FilterOption[] = [
    { id: "house", label: "House" },
    { id: "apartment", label: "Apartment" },
    { id: "guesthouse", label: "Guesthouse" },
    { id: "hotel", label: "Hotel" },
    { id: "cabin", label: "Cabin" },
  ];

  const amenities: FilterOption[] = [
    { id: "wifi", label: "Wifi" },
    { id: "kitchen", label: "Kitchen" },
    { id: "washer", label: "Washer" },
    { id: "dryer", label: "Dryer" },
    { id: "ac", label: "Air conditioning" },
    { id: "heating", label: "Heating" },
    { id: "pool", label: "Pool" },
    { id: "tv", label: "TV" },
    { id: "parking", label: "Free parking" },
  ];

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleClearAll = () => {
    setPriceRange([50, 500]);
    // Reset other filters as needed
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 md:hidden"
        >
          <Filter size={16} />
          <span>Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[80vh] rounded-t-xl bg-white p-0"
      >
        <div className="sticky top-0 z-10 bg-white p-4">
          <SheetHeader className="flex flex-row items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange?.(false)}
            >
              <X size={18} />
            </Button>
            <SheetTitle className="text-center text-lg font-medium">
              Filters
            </SheetTitle>
            <Button
              variant="ghost"
              className="text-sm font-medium text-black"
              onClick={handleClearAll}
            >
              Clear all
            </Button>
          </SheetHeader>
        </div>

        <div className="h-full overflow-y-auto px-4 pb-20">
          {/* Price Range Section */}
          <div className="py-4">
            <h3 className="mb-4 text-lg font-medium">Price range</h3>
            <div className="mb-6">
              <Slider
                defaultValue={priceRange}
                min={0}
                max={1000}
                step={10}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <div className="rounded-md border border-gray-300 p-2">
                  <p className="text-xs text-gray-500">Min price</p>
                  <p className="font-medium">${priceRange[0]}</p>
                </div>
                <div className="rounded-md border border-gray-300 p-2">
                  <p className="text-xs text-gray-500">Max price</p>
                  <p className="font-medium">${priceRange[1]}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Property Type Section */}
          <div className="py-4">
            <h3 className="mb-4 text-lg font-medium">Property type</h3>
            <div className="space-y-3">
              {propertyTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox id={`property-${type.id}`} />
                  <Label htmlFor={`property-${type.id}`} className="text-sm">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Amenities Section */}
          <div className="py-4">
            <h3 className="mb-4 text-lg font-medium">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox id={`amenity-${amenity.id}`} />
                  <Label htmlFor={`amenity-${amenity.id}`} className="text-sm">
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="sticky bottom-0 z-10 w-full border-t border-gray-200 bg-white p-4">
          <Button className="w-full" onClick={() => onOpenChange?.(false)}>
            Show results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterSheet;
