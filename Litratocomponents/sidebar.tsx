"use client";
import { useState } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

type SidebarProps = {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
};

export default function LitratoSidebar({
  isOpen: controlledOpen,
  onToggle,
}: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [internalOpen, setInternalOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: "/Icons/dashboard.png",
      path: "/customer/dashboard",
    },
    { label: "Booking", icon: "/Icons/booking.png", path: "/customer/booking" },
    {
      label: "Rescheduling",
      icon: "/Icons/rescheduling.png",
      path: "/customer/rescheduling",
    },
    {
      label: "Manage Account",
      icon: "/Icons/person.png",
      path: "/customer/accountmanager",
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

        {/* Flexible Logout with smooth transitions */}
        <div
          onClick={handleLogout}
          className={`relative ${
            isOpen ? "w-[50%]" : "w-10"
          } h-10 bg-litratoblack cursor-pointer self-center mt-4 text-white font-semibold rounded-full text-center flex items-center justify-center group
          transition-[width,background-color,transform,opacity] duration-300 ease-in-out hover:bg-red-600 hover:scale-[1.03] active:scale-95`}
        >
          {isOpen ? (
            "Logout"
          ) : (
            <FiLogOut
              className="text-xl transition-transform duration-300 ease-in-out"
              aria-hidden
            />
          )}
          {!isOpen && (
            <span className="absolute left-12 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 translate-y-1 group-hover:opacity-100 hover:scale-110 duration-500 transition-all ease-out">
              Logout
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto py-6 flex flex-col items-center gap-4">
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 flex flex-col items-center">
              <h2 className="text-lg font-bold mb-2">Confirm Logout</h2>
              <p className="mb-4 text-center">
                Are you sure you want to logout?
              </p>
              <div className="flex gap-4">
                <div
                  onClick={confirmLogout}
                  className="bg-litratoblack hover:scale-110 duration-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                >
                  Logout
                </div>
                <div
                  onClick={cancelLogout}
                  className="bg-gray-300 hover:scale-110 duration-500 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400"
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logo Section */}
        <div className="relative w-full h-28">
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center font-serif leading-tight transition-all duration-500 ease-in-out
            ${
              isOpen
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
            }`}
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
              isOpen
                ? "opacity-0 scale-95 translate-x-2 pointer-events-none"
                : "opacity-100 scale-100 translate-x-0"
            }`}
            aria-hidden={isOpen}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className={`relative transition-all duration-500 flex items-center justify-center ${
                  isOpen
                    ? "w-full h-full rounded-none overflow-visible"
                    : "w-12 h-12 rounded-full overflow-hidden"
                }`}
              >
                <Image
                  src="/Icons/litratoicon.png"
                  alt="Litrato Icon"
                  fill
                  className={`transition-transform duration-500 ease-in-out hover:scale-110 ${
                    isOpen ? "object-contain" : "object-cover"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
