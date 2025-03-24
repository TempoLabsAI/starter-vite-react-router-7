import React, { useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import MainContent from "./MainContent";
import FilterSidebar from "./FilterSidebar";
import MobileFilterSheet from "./MobileFilterSheet";
import { Button } from "./ui/button";
import { Filter, MapPin } from "lucide-react";

interface HomeProps {
  initialSearchLocation?: string;
  initialSelectedFilters?: string[];
  showFilterSidebar?: boolean;
}

const Home = ({
  initialSearchLocation = "",
  initialSelectedFilters = [],
  showFilterSidebar = false,
}: HomeProps) => {
  const [searchLocation, setSearchLocation] = useState(initialSearchLocation);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    initialSelectedFilters,
  );
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] =
    useState(showFilterSidebar);
  const [isMobileFilterSheetOpen, setIsMobileFilterSheetOpen] = useState(false);

  const handleSearch = (searchParams: {
    location: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: number;
  }) => {
    setSearchLocation(searchParams.location);
    // In a real app, this would trigger a data fetch based on search params
    console.log("Search params:", searchParams);
  };

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Search Section */}
      <div className="container mx-auto px-4 py-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Filter Bar */}
      <FilterBar
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Desktop Filter Button */}
        <div className="hidden md:block absolute top-4 right-4 z-20">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full shadow-sm"
            onClick={toggleFilterSidebar}
          >
            <Filter size={16} />
            <span>Filters</span>
          </Button>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden fixed bottom-20 right-4 z-20">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full shadow-md bg-white"
            onClick={() => setIsMobileFilterSheetOpen(true)}
          >
            <Filter size={16} />
            <span>Filters</span>
          </Button>
        </div>

        {/* Location Display */}
        {searchLocation && (
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span>
                Showing results for: <strong>{searchLocation}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <MainContent />

        {/* Filter Sidebar (Desktop) */}
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
        />

        {/* Mobile Filter Sheet */}
        <MobileFilterSheet
          isOpen={isMobileFilterSheetOpen}
          onOpenChange={setIsMobileFilterSheetOpen}
        />
      </div>
    </div>
  );
};

export default Home;
