"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LitratoBranding from "../../../Litratocomponents/Branding";
import LitratoFooter from "../../../Litratocomponents/Footer";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Login response:", data);
      try {
        // Persist access token for guards; API already returns 'Bearer <token>'
        localStorage.setItem("access_token", data.token);
      } catch {}
      //checks the user's role and got the dashboard based on assigned role
      if (data.role === "admin") {
        router.push("/admin");
        alert("Welcome Admin!");
      } else if (data.role === "customer") {
        router.push("/customer/dashboard");
        alert("Welcome Customer!");
      } else {
        router.push("/employee");
        alert("Welcome Employee!");
      }
    } else {
      const errorData = await res.json();
      setError(errorData.message); // Set error message from server response
    }
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
