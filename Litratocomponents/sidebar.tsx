"use client";
import { useState } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function LitratoSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleActive = (label: string, path: string) => {
    setActiveItem(label);
    router.replace(path); // Navigate without reloading
  };

  const navItems = [
    { label: "Booking", icon: "/Icons/booking.png", path: "/customer/booking" },
    {
      label: "Dashboard",
      icon: "/Icons/dashboard.png",
      path: "/customer/dashboard",
    },
    {
      label: "Rescheduling",
      icon: "/Icons/rescheduling.png",
      path: "/customer/rescheduling",
    },
    {
      label: "Manage Account",
      icon: "/Icons/person.png",
      path: "/customer/account",
    },
  ];

  return (
    <div
      className={`h-screen ${
        isOpen ? "w-64" : "w-16"
      } bg-gray-300 flex flex-col justify-between 
      transition-[width] duration-500 ease-in-out overflow-hidden`}
    >
      {/* Top: Toggle + Menu Items */}
      <div className="flex flex-col">
        {/* Toggle Button */}
        <div
          className="flex pl-[17px] py-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <HiMenu
            className="text-3xl text-litratoblack cursor-pointer"
            aria-label="Toggle Sidebar"
          />
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <div
            key={item.label}
            onClick={() => handleActive(item.label, item.path)}
            className={`flex items-center gap-3 pl-[18px] py-2 font-bold rounded-lg cursor-pointer
              transition-all duration-300 ease-in-out relative group
              ${
                activeItem === item.label
                  ? "bg-litratored text-white"
                  : "text-litratoblack hover:bg-gray-200"
              }`}
          >
            <Image
              src={item.icon}
              alt={`${item.label} icon`}
              width={28}
              height={28}
            />
            <span
              className={`whitespace-nowrap transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.label}
            </span>
            {!isOpen && (
              <span className="absolute left-14 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Branding Section */}
      <div className="mt-auto py-4 flex justify-center items-center transition-all duration-500 ease-in-out">
        {isOpen ? (
          <div className="flex flex-col text-center font-didone leading-tight transition-opacity duration-500 ease-in-out opacity-100">
            <div className="text-[48px]">
              LITRATO
              <br />
              <p className="text-[36px]">BYAM</p>
            </div>
            <p className="text-[12px] font-semibold">
              Moments in Memories <br />
              Pop up photo booth in Davao City <br />
              Discover the perfect memory for you!
            </p>
          </div>
        ) : (
          <div className="relative w-full h-20">
            <Image
              src="/Icons/litratoicon.png"
              alt="Litrato Icon"
              fill
              className="transition-transform duration-500 ease-in-out object-contain hover:scale-110"
            />
          </div>
        )}
      </div>
    </div>
  );
}
