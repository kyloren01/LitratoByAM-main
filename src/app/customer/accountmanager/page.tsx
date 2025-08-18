"use client";
import { useState } from "react";
import Image from "next/image";

export default function AccountManagementPage() {
  const [isEditable, setIsEditable] = useState(false);

  // Define your form sections
  const personalInfo = [
    { label: "First Name", type: "text" },
    { label: "Last Name", type: "text" },
    { label: "Birthdate", type: "text" },
    { label: "Sex", type: "text" },
    { label: "Contact Number", type: "text" },
  ];

  const addressInfo = [
    { label: "Region", type: "text" },
    { label: "Province", type: "text" },
    { label: "City/Town", type: "text" },
    { label: "Barangay", type: "text" },
    { label: "Postal Code", type: "text" },
  ];

  const accountSettings = [
    { label: "Old Password", type: "password" },
    { label: "New Password", type: "password" },
    { label: "Confirm Password", type: "password" },
  ];

  return (
    <div className="h-screen p-4">
      <div className="flex flex-col p-4 justify-center gap-4">
        {/* Profile */}
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
          <div className="flex flex-row gap-6">
            <button
              onClick={() => setIsEditable((prev) => !prev)}
              className="bg-litratoblack rounded py-2 px-4 text-white"
            >
              {isEditable ? "Cancel Edit" : "Edit Profile"}
            </button>
            <div className="bg-litratoblack rounded-full py-2 px-4 text-white">
              Change Password
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <p className="text-2xl">Manage your account</p>
        <div className="flex flex-row gap-12 ">
          {personalInfo.map((field) => (
            <div key={field.label} className="flex flex-col w-auto">
              <label>{field.label}:</label>
              <input
                type={field.type}
                placeholder="Enter here:"
                disabled={!isEditable}
                className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
                  isEditable
                    ? "bg-gray-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Address Info */}
        <div className="flex flex-row gap-12">
          {addressInfo.map((field) => (
            <div key={field.label} className="flex flex-col w-auto">
              <label>{field.label}:</label>
              <input
                type={field.type}
                placeholder="Enter here:"
                disabled={!isEditable}
                className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
                  isEditable
                    ? "bg-gray-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Account Settings */}
        <p className="text-2xl">Account Settings</p>
        <div className="flex flex-col gap-4 w-1/3">
          {accountSettings.map((field) => (
            <div key={field.label} className="flex flex-col">
              <label>{field.label}:</label>
              <input
                type={field.type}
                placeholder="Enter here:"
                disabled={!isEditable}
                className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
                  isEditable
                    ? "bg-gray-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
