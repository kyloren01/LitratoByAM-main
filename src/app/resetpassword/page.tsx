"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
export default function LoginPage() {
  const router = useRouter();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleCancel = () => {
    toast.error("Password reset cancelled.");
    router.push("/login");
  };

  const handleResetClick = () => {
    setConfirmReset(true);
  };

  const handleConfirmReset = () => {
    setConfirmReset(false);
    toast.success("Password reset successfully!");
    router.push("/login");
  };

  const handleDialogCancel = () => {
    setConfirmReset(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center ">
      <h1 className="text-3xl font-bold text-center">Reset Password</h1>
      <section className="flex flex-col items-center justify-center mt-8 gap-y-4 mb-12">
        {/* Forms */}
        <div className="flex flex-col w-[30%]">
          <div>
            <label className="block text-lg mb-1">Enter New Password:</label>
            <input
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md p-2 text-sm mb-2 focus:outline-none"
            />
            <label className="block text-lg mb-1">Confirm New Password:</label>
            <input
              type="password"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className=" flex flex-row justify-between w-[30%]">
          <div
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 rounded select-none text-white px-6 py-2  hover:cursor-pointer font-bold transition-all duration-200 "
          >
            Cancel
          </div>
          <div
            onClick={handleResetClick}
            className="bg-litratoblack rounded select-none text-white px-6 py-2  hover:cursor-pointer font-bold transition-all duration-200 hover:bg-black"
          >
            Reset Password
          </div>
        </div>
        {/* Confirmation Dialog */}
        {confirmReset && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] flex flex-col items-center">
              <p className="text-lg mb-4 text-center">
                Are you sure you want to reset your password?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDialogCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="bg-litratoblack text-white px-4 py-2 rounded hover:bg-black font-bold"
                >
                  Yes, Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
