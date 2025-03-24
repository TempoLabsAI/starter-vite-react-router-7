import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface PropertyCardProps {
  id?: string;
  title?: string;
  location?: string;
  price?: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  isSuperhost?: boolean;
  dates?: string;
}

const PropertyCard = ({
  id = "1",
  title = "Cozy Mountain Cabin",
  location = "Lake Tahoe, California",
  price = 189,
  rating = 4.92,
  reviewCount = 128,
  images = [
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
  ],
  isSuperhost = true,
  dates = "Nov 12-17",
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="w-full max-w-[300px] overflow-hidden border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Image Carousel */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={image}
                      alt={`${title} - image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
          </Carousel>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full h-8 w-8"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`}
            />
          </Button>

          {/* Superhost Badge */}
          {isSuperhost && (
            <Badge className="absolute top-2 left-2 z-10 bg-white text-black font-medium">
              Superhost
            </Badge>
          )}
        </div>

        {/* Property Details */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-base truncate">{title}</h3>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
              </svg>
              <span className="text-sm">{rating}</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-1">{location}</p>
          <p className="text-gray-500 text-sm mt-1">{dates}</p>

          <div className="mt-2">
            <span className="font-semibold">${price}</span>
            <span className="text-gray-500"> night</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
