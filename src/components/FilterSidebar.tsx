import React from "react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const FilterSidebar = ({
  isOpen = true,
  onClose = () => {},
}: FilterSidebarProps) => {
  return (
    <div
      className={cn(
        "fixed top-[150px] right-0 h-[calc(100vh-150px)] w-[350px] bg-white shadow-lg transition-transform duration-300 z-10 overflow-auto",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Price Range</h3>
          <Slider
            defaultValue={[50, 250]}
            max={500}
            step={10}
            className="mb-4"
          />
          <div className="flex justify-between">
            <div className="border rounded-md p-2 w-[45%]">
              <span className="text-xs text-gray-500">min price</span>
              <p className="font-medium">$50</p>
            </div>
            <div className="border rounded-md p-2 w-[45%]">
              <span className="text-xs text-gray-500">max price</span>
              <p className="font-medium">$250</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Property Type */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Property Type</h3>
          <div className="space-y-3">
            {["House", "Apartment", "Guesthouse", "Hotel", "Cabin"].map(
              (type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`property-${type}`} />
                  <Label htmlFor={`property-${type}`}>{type}</Label>
                </div>
              ),
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Amenities */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Wifi",
              "Kitchen",
              "Washer",
              "Dryer",
              "Air conditioning",
              "Heating",
              "Dedicated workspace",
              "TV",
              "Pool",
              "Hot tub",
              "Free parking",
              "EV charger",
            ].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox id={`amenity-${amenity}`} />
                <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Booking Options */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Booking Options</h3>
          <div className="space-y-3">
            {["Instant Book", "Self check-in", "Free cancellation"].map(
              (option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={`option-${option}`} />
                  <Label htmlFor={`option-${option}`}>{option}</Label>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <Button variant="outline" className="w-1/2">
            Clear all
          </Button>
          <Button className="w-1/2 bg-[#FF385C] hover:bg-[#E31C5F]">
            Show results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
