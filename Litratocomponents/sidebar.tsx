"use client";
import { useState } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import { useRouter } from "next/navigation";

type SidebarProps = {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
};

export default function LitratoSidebar({ isOpen: controlledOpen, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [internalOpen, setInternalOpen] = useState(true);
  const router = useRouter();

  const isOpen = controlledOpen ?? internalOpen;
  const toggleOpen = () => {
    if (onToggle) onToggle(!isOpen);
    else setInternalOpen((prev) => !prev);
  };

  const handleActive = (label: string, path: string) => {
    setActiveItem(label);
    router.push(path); // Navigate without reloading
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // remove access token
    router.push("/login"); // redirect to login
  };

  const navItems = [
    { label: "Dashboard", icon: "/Icons/dashboard.png", path: "/customer/dashboard" },
    { label: "Booking", icon: "/Icons/booking.png", path: "/customer/booking" },
    { label: "Rescheduling", icon: "/Icons/rescheduling.png", path: "/customer/rescheduling" },
    { label: "Manage Account", icon: "/Icons/person.png", path: "/customer/accountmanager" },
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
        <div className="flex pl-[17px] py-2" onClick={toggleOpen}>
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

      {/* Bottom: Logo + Logout */}
      <div className="mt-auto py-6 flex flex-col items-center gap-4">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-[80%] bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

        {/* Logo Section */}
        <div className="relative w-full h-28">
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center font-serif leading-tight transition-all duration-500 ease-in-out
            ${isOpen ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 -translate-x-2 pointer-events-none"}`}
            aria-hidden={!isOpen}
          >
            <div className="text-[40px] md:text-[48px]">
              LITRATO
              <br />
              <p className="text-[28px] md:text-[36px]">BYAM</p>
            </div>
            <p className="text-[11px] md:text-[12px] font-semibold">
              Moments in Memories <br />
              Pop up photo booth in Davao City <br />
              Discover the perfect memory for you!
            </p>
          </div>

          {/* Compact logo */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isOpen ? "opacity-0 scale-95 translate-x-2 pointer-events-none" : "opacity-100 scale-100 translate-x-0"
            }`}
            aria-hidden={isOpen}
          >
            <div className="relative w-full h-full">
              <Image
                src="/Icons/litratoicon.png"
                alt="Litrato Icon"
                fill
                className="object-contain transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
