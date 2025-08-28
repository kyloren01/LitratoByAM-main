"use client";
import { useState, useCallback } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import {
  FiGrid,
  FiCalendar,
  FiRefreshCcw,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { useRouter, usePathname } from "next/navigation";

// Small utility for composing classes
const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

type SidebarProps = {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
};

// Define NavItem type and hoist static items for stability
type NavItem = { label: string; Icon: IconType; path: string };
const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", Icon: FiGrid, path: "/customer/dashboard" },
  { label: "Booking", Icon: FiCalendar, path: "/customer/booking" },
  { label: "Rescheduling", Icon: FiRefreshCcw, path: "/customer/rescheduling" },
  { label: "Manage Account", Icon: FiUser, path: "/customer/accountmanager" },
];

export default function LitratoSidebar({
  isOpen: controlledOpen,
  onToggle,
}: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = controlledOpen ?? internalOpen;

  const toggleOpen = useCallback(() => {
    if (onToggle) onToggle(!isOpen);
    else setInternalOpen((prev) => !prev);
  }, [onToggle, isOpen]);

  const handleNavigation = useCallback(
    (path: string) => {
      if (pathname !== path) router.push(path);
    },
    [router, pathname]
  );

  const getNavKeyDown = useCallback(
    (path: string) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNavigation(path);
      }
    },
    [handleNavigation]
  );

  const handleLogout = useCallback(() => setShowLogoutModal(true), []);
  const confirmLogout = useCallback(() => {
    localStorage.removeItem("access_token");
    router.push("/login");
    setShowLogoutModal(false);
  }, [router]);
  const cancelLogout = useCallback(() => setShowLogoutModal(false), []);

  return (
    <div
      className={cx(
        "h-screen",
        isOpen ? "w-64" : "w-16",
        "bg-gray-300 flex flex-col justify-between transition-[width] duration-500 ease-in-out overflow-hidden"
      )}
    >
      {/* Top: Toggle + Menu Items */}
      <div className="flex flex-col">
        {/* Toggle Button (accessibility-friendly) */}
        <button
          type="button"
          className="flex pl-[17px] py-2 w-fit"
          onClick={toggleOpen}
          aria-label="Toggle Sidebar"
          aria-expanded={isOpen}
        >
          <HiMenu
            className="text-3xl text-litratoblack hover:text-litratored"
            aria-hidden
          />
        </button>

        {/* Navigation Items */}
        {NAV_ITEMS.map((item) => {
          const active = pathname?.startsWith(item.path);
          return (
            <div
              key={item.label}
              role="button"
              tabIndex={0}
              onClick={() => handleNavigation(item.path)}
              onKeyDown={getNavKeyDown(item.path)}
              className={cx(
                "flex items-center py-2 font-bold rounded-lg cursor-pointer transition-all duration-300 ease-in-out relative group",
                isOpen ? "gap-3 pl-[18px]" : "gap-0 pl-[17.5px]",
                active
                  ? "bg-litratored text-white"
                  : "text-litratoblack hover:bg-gray-200 hover:text-litratored"
              )}
              aria-current={active ? "page" : undefined}
            >
              <item.Icon
                size={28}
                className="text-current shrink-0"
                aria-hidden
              />
              <span
                aria-hidden={!isOpen}
                className={cx(
                  "whitespace-nowrap transition-all duration-300 ease-in-out",
                  isOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden pointer-events-none"
                )}
              >
                {item.label}
              </span>
              {!isOpen && (
                <span className="absolute left-14 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}

        {/* Logout (unchanged position and design) */}
        <div
          onClick={handleLogout}
          className={`relative ${
            isOpen ? "w-[50%]" : "w-10"
          } h-10 bg-litratoblack cursor-pointer self-center mt-4 text-white font-semibold rounded-full text-center flex items-center justify-center group
          transition-[width,background-color,transform,opacity] duration-300 ease-in-out hover:bg-red-600  active:scale-95`}
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
            <span className="absolute left-12 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 translate-y-1 group-hover:opacity-100 transition-all ease-out">
              Logout
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto py-6 flex flex-col items-center gap-4">
        {showLogoutModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 flex flex-col items-center">
              <h2 id="logout-title" className="text-lg font-bold mb-2">
                Confirm Logout
              </h2>
              <p className="mb-4 text-center">
                Are you sure you want to logout?
              </p>
              <div className="flex gap-4">
                <div
                  onClick={confirmLogout}
                  className="bg-litratoblack cursor-pointer duration-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                >
                  Logout
                </div>
                <div
                  onClick={cancelLogout}
                  className="bg-gray-300 duration-500 cursor-pointer text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400"
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
