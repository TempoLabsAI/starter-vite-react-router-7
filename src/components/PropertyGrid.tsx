import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Skeleton } from "./ui/skeleton";

interface PropertyGridProps {
  properties?: Property[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMoreProperties?: boolean;
  viewMode?: "grid" | "list";
}

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
}

const PropertyGrid = ({
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
    },
    {
      id: "5",
      title: "Luxury Penthouse with Views",
      location: "Miami, Florida",
      price: 425,
      rating: 4.9,
      reviewCount: 156,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
        "https://images.unsplash.com/photo-1560185007-c5ca9d2c0862?w=800&q=80",
      ],
      isSuperhost: false,
      dates: "Feb 14-19",
    },
    {
      id: "6",
      title: "Charming Cottage",
      location: "Portland, Oregon",
      price: 165,
      rating: 4.88,
      reviewCount: 112,
      images: [
        "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=800&q=80",
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      ],
      isSuperhost: true,
      dates: "Mar 3-8",
    },
  ],
  isLoading = false,
  onLoadMore = () => {},
  hasMoreProperties = true,
  viewMode = "grid",
}: PropertyGridProps) => {
  const [displayMode, setDisplayMode] = useState<"grid" | "list">(viewMode);

  return (
    <div className="w-full bg-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Properties</h2>
        <Tabs
          defaultValue={displayMode}
          onValueChange={(value) => setDisplayMode(value as "grid" | "list")}
          className="w-[200px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="w-full">
                <Skeleton className="w-full h-[250px] rounded-lg" />
                <div className="mt-2 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${displayMode === "list" ? "!grid-cols-1" : ""}`}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className={`${displayMode === "list" ? "flex" : ""}`}
              >
                <PropertyCard
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  rating={property.rating}
                  reviewCount={property.reviewCount}
                  images={property.images}
                  isSuperhost={property.isSuperhost}
                  dates={property.dates}
                />
              </div>
            ))}
          </div>

          {hasMoreProperties && (
            <div className="mt-8 flex justify-center">
              <Button onClick={onLoadMore} variant="outline" className="px-6">
                Load more properties
              </Button>
            </div>
          )}

          {properties.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-gray-500 text-center max-w-md">
                Try adjusting your search filters to find more properties.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyGrid;
