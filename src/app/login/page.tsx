"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LitratoBranding from "../../../Litratocomponents/Branding";
import LitratoFooter from "../../../Litratocomponents/Footer";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      router.push("/customer");
    } else {
      alert("Invalid Nigga");
    } // Redirect to customer page
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
          />
        </div>
        <LitratoBranding />
      </section>

      <section className="flex flex-col items-center justify-center mt-8 gap-y-4 mb-12">
        {/* Forms */}
        <div className="flex flex-col w-[30%] gap-2">
          <div>
            <label className="block text-lg mb-1">Username:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md p-2 text-sm focus:outline-none"
            />
            <label className="block text-lg mb-1">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter here:"
              className="w-full bg-gray-200 rounded-md p-2 text-sm focus:outline-none"
            />
          </div>
        </div>
        {/* Login Button */}
        <div
          onClick={handleLogin}
          className="bg-litratoblack text-white px-6 py-2 rounded-lg hover:cursor-pointer font-bold transition-all duration-200 hover:bg-gray-800"
        >
          LOGIN
        </div>
      </section>

      <LitratoFooter />
    </div>
  );
}
