import React, { useState } from "react";
import { Search, MapPin, Calendar as CalendarIcon, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SearchBarProps {
  onSearch?: (searchParams: {
    location: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: number;
  }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps = {}) => {
  const [location, setLocation] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState<number>(1);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        location,
        checkIn,
        checkOut,
        guests,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-full shadow-md border border-gray-200 flex items-center p-2">
      {/* Location Input */}
      <div className="flex-1 min-w-0 border-r border-gray-200 px-4">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
          <Input
            type="text"
            placeholder="Where are you going?"
            className="border-none shadow-none focus-visible:ring-0 p-0 h-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Check-in Date */}
      <div className="flex-1 min-w-0 border-r border-gray-200 px-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-10 p-0">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {checkIn ? checkIn.toLocaleDateString() : "Check-in"}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkIn}
              onSelect={setCheckIn}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Check-out Date */}
      <div className="flex-1 min-w-0 border-r border-gray-200 px-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-10 p-0">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {checkOut ? checkOut.toLocaleDateString() : "Check-out"}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={setCheckOut}
              initialFocus
              disabled={(date) => date < (checkIn || new Date())}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guests */}
      <div className="flex-1 min-w-0 px-4">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-gray-400 mr-2" />
          <Select
            value={guests.toString()}
            onValueChange={(value) => setGuests(parseInt(value))}
          >
            <SelectTrigger className="border-none shadow-none focus:ring-0 p-0 h-10">
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <div className="pl-2">
        <Button
          onClick={handleSearch}
          className="rounded-full bg-rose-500 hover:bg-rose-600 h-12 w-12 flex items-center justify-center p-0"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
