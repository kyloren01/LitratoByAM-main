"use client";
import Image from "next/image";
import LitratoBranding from "../../../Litratocomponents/Branding";
import LitratoFooter from "../../../Litratocomponents/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function RegistrationPage() {
  const router = useRouter();
  const handleRegistered = () => {
    router.push("/login");
  };
  const handleBack = () => {
    router.push("/home"); // Redirect to home page
  };
  const [value, setValue] = useState("");

  const formatDate = (input: string) => {
    // Remove non-digits
    const cleaned = input.replace(/\D/g, "");

    // Apply MM/DD/YYYY format
    let formatted = "";
    if (cleaned.length > 0) formatted += cleaned.substring(0, 2);
    if (cleaned.length > 2) formatted += "/" + cleaned.substring(2, 4);
    if (cleaned.length > 4) formatted += "/" + cleaned.substring(4, 8);

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(formatDate(e.target.value));
  };
  return (
    <div>
      <section>
        <div className="relative h-56 w-full mb-6">
          <Image
            src="/Images/litratobg.jpg"
            alt="background_img"
            fill
            className="object-cover bg-no-repeat"
            priority
          ></Image>
        </div>
        <LitratoBranding></LitratoBranding>
      </section>
      <div className="flex flex-row justify-center gap-8 mt-8 ">
        <form className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96">
          <label>
            Firstname:
            <input
              placeholder="Juan"
              type="text"
              className="w-70 px-2 text-xl border-none outline-none bg-transparent"
            />
          </label>
        </form>
        <form className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96">
          <label>
            Lastname:
            <input
              placeholder="Dela Cruz"
              type="text"
              className="w-70 px-2 text-xl border-none outline-none bg-transparent"
            />
          </label>
        </form>
      </div>
      <div className="flex flex-row justify-center gap-8 mt-4 ">
        <form className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96">
          <label>
            Birthdate:
            <input
              value={value}
              onChange={handleChange}
              type="text"
              className="w-70 px-2 text-xl border-none outline-none bg-transparent"
              placeholder="MM/DD/YYYY"
            />
          </label>
        </form>
        <form className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96">
          <label>
            Sex:
            <input
              placeholder="Male/Female"
              type="text"
              className="w-70 px-2 text-xl border-none outline-none bg-transparent"
            />
          </label>
        </form>
      </div>
      <div className="flex flex-col items-center mt-4 gap-y-4 mb-8">
        <form className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200">
          <label>
            Username:
            <input
              placeholder="example@gmail.com"
              type="text"
              className="w-170 px-2 text-xl border-none outline-none bg-transparent"
            />
          </label>
        </form>
        <form className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200">
          <label>
            Password:
            <input
              placeholder="Example1234"
              type="text"
              className="w-170 px-2 text-xl border-none outline-none bg-transparent"
            />
          </label>
        </form>
        <form className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200">
          <label>
            Confirm Password:
            <input
              placeholder="Example1234"
              type="text"
              className="w-160 px-2 text-xl border-none outline-none bg-transparent"
            />
          </label>
        </form>
        <form className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200">
          <label>
            Address:
            <input
              placeholder="Example St. 123"
              type="text"
              className="w-170 px-2 text-xl border-none outline-none bg-transparent"
            />
          </label>
        </form>
        <form className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200">
          <label>
            Contact Number:
            <input
              placeholder="09******123"
              type="text"
              className="w-150 px-2 text-xl border-none outline-none bg-transparent"
            />
          </label>
        </form>
      </div>
      <div className="flex flex-row justify-center gap-8 my-8 ">
        <div
          onClick={handleBack}
          className="bg-[#878787] text-litratoblack px-4 py-2 w-28 text-center rounded-lg hover:cursor-pointer font-bold"
        >
          Back
        </div>
        <div
          onClick={handleRegistered}
          className="bg-litratoblack text-white px-4 py-2 w-28 text-center rounded-lg hover:cursor-pointer font-bold"
        >
          Register
        </div>
      </div>
      <LitratoFooter></LitratoFooter>
    </div>
  );
}
