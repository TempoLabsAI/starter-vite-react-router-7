import React, { useState } from "react";
import PropertyGrid from "./PropertyGrid";
import InteractiveMap from "./InteractiveMap";
import { Button } from "./ui/button";
import { MapIcon, GridIcon } from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isSuperhost: boolean;
  dates: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface MainContentProps {
  properties?: Property[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMoreProperties?: boolean;
  initialView?: "grid" | "map" | "split";
}

const MainContent = ({
  properties = [
    {
      id: "1",
      title: "Cozy Mountain Cabin",
      location: "Lake Tahoe, California",
      price: 189,
      rating: 4.92,
      reviewCount: 128,
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
        "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      ],
      isSuperhost: true,
      dates: "Nov 12-17",
      coordinates: { lat: 39.0968, lng: -120.0324 },
    },
    {
      id: "2",
      title: "Beachfront Paradise",
      location: "Malibu, California",
      price: 350,
      rating: 4.85,
      reviewCount: 96,
      images: [
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
      ],
      isSuperhost: false,
      dates: "Dec 1-6",
      coordinates: { lat: 39.1168, lng: -120.1124 },
    },
    {
      id: "3",
      title: "Modern Downtown Loft",
      location: "New York, New York",
      price: 275,
      rating: 4.78,
      reviewCount: 214,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      ],
      isSuperhost: true,
      dates: "Jan 5-10",
      coordinates: { lat: 39.0768, lng: -120.0624 },
    },
    {
      id: "4",
      title: "Rustic Farmhouse Retreat",
      location: "Hudson Valley, New York",
      price: 195,
      rating: 4.96,
      reviewCount: 87,
      images: [
        "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
        "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&q=80",
      ],
      isSuperhost: true,
      dates: "Oct 20-25",
      coordinates: { lat: 39.1068, lng: -120.0824 },
    },
  ],
  isLoading = false,
  onLoadMore = () => {},
  hasMoreProperties = true,
  initialView = "split",
}: MainContentProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "map" | "split">(
    initialView,
  );
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");

  // Filter properties to only include those with coordinates for the map
  const propertiesWithCoordinates = properties.filter(
    (property) => property.coordinates,
  ) as (Property & { coordinates: { lat: number; lng: number } })[];

  const handlePropertySelect = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* View toggle controls */}
      <div className="flex justify-end p-4 border-b">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            className="rounded-md"
            onClick={() => setViewMode("grid")}
          >
            <GridIcon className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "ghost"}
            size="sm"
            className="rounded-md"
            onClick={() => setViewMode("map")}
          >
            <MapIcon className="h-4 w-4 mr-2" />
            Map
          </Button>
          <Button
            variant={viewMode === "split" ? "default" : "ghost"}
            size="sm"
            className="rounded-md"
            onClick={() => setViewMode("split")}
          >
            <div className="flex items-center">
              <GridIcon className="h-4 w-4" />
              <span className="mx-1">/</span>
              <MapIcon className="h-4 w-4" />
            </div>
            Split
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Grid view */}
        {(viewMode === "grid" || viewMode === "split") && (
          <div
            className={`${viewMode === "split" ? "w-1/2" : "w-full"} overflow-y-auto`}
          >
            <PropertyGrid
              properties={properties}
              isLoading={isLoading}
              onLoadMore={onLoadMore}
              hasMoreProperties={hasMoreProperties}
              viewMode="grid"
            />
          </div>
        )}

        {/* Map view */}
        {(viewMode === "map" || viewMode === "split") && (
          <div
            className={`${viewMode === "split" ? "w-1/2" : "w-full"} h-full border-l`}
          >
            <InteractiveMap
              properties={propertiesWithCoordinates}
              onPropertySelect={handlePropertySelect}
              selectedPropertyId={selectedPropertyId}
              center={propertiesWithCoordinates[0]?.coordinates}
              zoom={13}
            />
          </div>
        )}
      </div>

      {/* Mobile view - show only one view at a time with full width */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white rounded-full shadow-lg p-2 flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setViewMode("grid")}
          >
            <GridIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setViewMode("map")}
          >
            <MapIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
