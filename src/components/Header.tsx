import React from "react";
import { Search, Globe, Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarImage, AvatarFallback } from "./ui/avatar";

interface HeaderProps {
  isScrolled?: boolean;
  userLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Header = ({
  isScrolled = false,
  userLoggedIn = false,
  userName = "Guest",
  userAvatar = "",
}: HeaderProps) => {
  return (
    <header
      className={`w-full bg-white ${isScrolled ? "shadow-sm" : ""} sticky top-0 z-50 transition-shadow duration-200`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1000"
              className="h-8 w-8 text-rose-500 fill-current"
            >
              <path d="M499.9 222.7c-150.6 0-195 118.3-195 118.3s44.4 118.3 195 118.3 195-118.3 195-118.3-44.4-118.3-195-118.3zm0 196.3c-42.8 0-77.5-34.7-77.5-77.5s34.7-77.5 77.5-77.5 77.5 34.7 77.5 77.5-34.7 77.5-77.5 77.5zm-298 130.3c-3.5 7.1-6.9 14.3-10.2 21.5-23.2 50.1-42.7 101-42.7 140.8 0 129.6 105.4 235 235 235s235-105.4 235-235c0-39.8-19.5-90.7-42.7-140.8-3.3-7.2-6.7-14.4-10.2-21.5-89.5 122.8-274.2 122.8-364.2 0z" />
              <path d="M500 10C229.4 10 10 229.4 10 500s219.4 490 490 490 490-219.4 490-490S770.6 10 500 10zm311.9 558.9c0 172.3-140.3 312.6-312.6 312.6S187.4 741.2 187.4 568.9c0-50.9 21.2-110.1 47.6-166.7 3.5-7.6 7.1-15.1 10.7-22.6 97.9 134.8 299.3 134.8 397.2 0 3.6 7.5 7.2 15 10.7 22.6 26.4 56.7 47.6 115.9 47.6 166.7h.7z" />
            </svg>
            <span className="ml-2 text-rose-500 font-bold text-xl">airbnb</span>
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block max-w-md w-full">
          <div className="border border-gray-300 rounded-full py-2 px-4 flex items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <span className="font-medium text-sm">Anywhere</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="font-medium text-sm">Any week</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-400 text-sm">Add guests</span>
            <div className="ml-auto bg-rose-500 p-2 rounded-full text-white">
              <Search className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="hidden md:flex items-center rounded-full hover:bg-gray-100"
          >
            <span className="text-sm font-medium">Become a Host</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
          >
            <Globe className="h-5 w-5" />
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center space-x-2 rounded-full border border-gray-300 p-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <Menu className="h-4 w-4" />
              <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                {userLoggedIn ? (
                  <Avatar>
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
