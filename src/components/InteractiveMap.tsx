import React, { useState, useEffect } from "react";
import { MapPin, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Card } from "./ui/card";
import PropertyCard from "./PropertyCard";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isSuperhost: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface InteractiveMapProps {
  properties?: Property[];
  onPropertySelect?: (propertyId: string) => void;
  selectedPropertyId?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const InteractiveMap = ({
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
      ],
      isSuperhost: true,
      coordinates: { lat: 39.0968, lng: -120.0324 },
    },
    {
      id: "2",
      title: "Beachfront Villa",
      location: "Malibu, California",
      price: 350,
      rating: 4.85,
      reviewCount: 76,
      images: [
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      ],
      isSuperhost: false,
      coordinates: { lat: 39.1168, lng: -120.1124 },
    },
    {
      id: "3",
      title: "Downtown Loft",
      location: "San Francisco, California",
      price: 275,
      rating: 4.78,
      reviewCount: 104,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      ],
      isSuperhost: true,
      coordinates: { lat: 39.0768, lng: -120.0624 },
    },
    {
      id: "4",
      title: "Luxury Penthouse",
      location: "Los Angeles, California",
      price: 425,
      rating: 4.96,
      reviewCount: 52,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      ],
      isSuperhost: true,
      coordinates: { lat: 39.1068, lng: -120.0824 },
    },
  ],
  onPropertySelect = () => {},
  selectedPropertyId = "",
  center = { lat: 39.0968, lng: -120.0324 },
  zoom = 13,
}: InteractiveMapProps) => {
  const [mapZoom, setMapZoom] = useState(zoom);
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const [showPropertyCard, setShowPropertyCard] = useState<string | null>(null);

  // Simulate map movement when zoom changes
  useEffect(() => {
    // This would be replaced with actual map library code
    console.log(`Map zoom level changed to ${mapZoom}`);
  }, [mapZoom]);

  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 1, 1));
  };

  const handleMarkerClick = (propertyId: string) => {
    onPropertySelect(propertyId);
    setShowPropertyCard(propertyId === showPropertyCard ? null : propertyId);
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Map container - in a real implementation this would be replaced with a map library */}
      <div className="w-full h-full bg-[#e8f4f8] relative">
        {/* Simulated map content with grid lines */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-[#d0e8f2] bg-[#e8f4f8]"></div>
          ))}
        </div>

        {/* Property markers */}
        {properties.map((property) => (
          <div
            key={property.id}
            className={`absolute cursor-pointer transition-all duration-300 transform ${hoveredProperty === property.id || selectedPropertyId === property.id ? "scale-125 z-20" : "z-10"}`}
            style={{
              left: `${(property.coordinates.lng - center.lng) * 10 + 50}%`,
              top: `${(property.coordinates.lat - center.lat) * -10 + 50}%`,
            }}
            onMouseEnter={() => setHoveredProperty(property.id)}
            onMouseLeave={() => setHoveredProperty(null)}
            onClick={() => handleMarkerClick(property.id)}
          >
            <TooltipProvider>
              <Tooltip
                open={hoveredProperty === property.id && !showPropertyCard}
              >
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center justify-center ${selectedPropertyId === property.id ? "bg-black text-white" : "bg-white text-black"} rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-shadow`}
                  >
                    <div className="px-2 py-1 text-sm font-medium whitespace-nowrap">
                      ${property.price}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-white p-0 border-none shadow-lg"
                >
                  <div className="w-48">
                    <div className="p-2">
                      <div className="font-medium">{property.title}</div>
                      <div className="text-sm text-gray-500">
                        {property.location}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-semibold">
                          ${property.price}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          night
                        </span>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Property card popup when marker is clicked */}
            {showPropertyCard === property.id && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 z-30">
                <Card className="w-64 shadow-xl">
                  <PropertyCard
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    rating={property.rating}
                    reviewCount={property.reviewCount}
                    images={property.images}
                    isSuperhost={property.isSuperhost}
                  />
                </Card>
              </div>
            )}
          </div>
        ))}

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-100 rounded-full h-10 w-10 shadow-md"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-100 rounded-full h-10 w-10 shadow-md"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Current location button */}
        <div className="absolute bottom-4 left-4">
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 rounded-full shadow-md flex items-center gap-2 px-4"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Current location</span>
          </Button>
        </div>

        {/* Map attribution - would be required by most map providers */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          Map data © Example Map Provider
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
