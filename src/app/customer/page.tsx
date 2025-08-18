"use client";
import Image from "next/image";
export default function DashboardPage() {
  const formtitles = ["First Name:", "Last Name:"];
  return (
    <div className="h-screen p-4">
      <div className="flex flex-col p-2 justify-center gap-4">
        <div className="flex flex-col justify-center gap-2 items-center">
          <div className="flex bg-black h-30 w-30 rounded-full relative">
            <Image
              src={"/Images/hanz.png"}
              alt="profile pic"
              fill
              className="rounded-full"
            />
          </div>
          <p className="text-black text-center text-3xl font-semibold">
            Welcome, Kirby Calong!
          </p>
          <div className="bg-litratoblack rounded-full py-2 px-4 text-white">
            Edit Profile
          </div>
        </div>

        <p className="text-2xl">Manager your account</p>
        <div className="flex flex-row gap-12">
          <div className="flex flex-col w-[30%]">
            <label>Firstname:</label>
            <input
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-[30%]">
            <label>Lastname:</label>
            <input
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-[15%]">
            <label>Birthdate:</label>
            <input
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-[15%]">
            <label>Sex:</label>
            <select className="w-full bg-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none">
              <option>Male</option>
              <option>Female</option>
              <option>Prefer Not To Say</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row gap-12">
          <div className="flex flex-col w-auto">
            <label>Region:</label>
            <input
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-auto">
            <label>Province:</label>
            <input
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-auto">
            <label>City/Town:</label>
            <input
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-auto">
            <label>Brgy:</label>
            <input
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div className="flex flex-col w-auto">
            <label>Postal Code:</label>
            <input
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
