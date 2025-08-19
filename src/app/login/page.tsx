"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LitratoBranding from "../../../Litratocomponents/Branding";
import LitratoFooter from "../../../Litratocomponents/Footer";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
  try {
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

      // If backend sends "Bearer <token>", strip the prefix
      const token = data.token.startsWith("Bearer ")
        ? data.token.split(" ")[1]
        : data.token;

      try {
        localStorage.setItem("access_token", token);
      } catch {
        toast.error("Failed to save access token. Please try again.");
      }

      // Either use data.role (if backend sends it) OR decode from token
      let role = data.role;
      if (!role) {
        try {
          const decoded: any = jwtDecode(token);
          role = decoded.role;
        } catch {
          toast.error("Invalid token received.");
          return;
        }
      }

      if (role === "admin") {
        router.push("/admin");
        toast.success("Welcome Admin!");
      } else if (role === "customer") {
        router.push("/customer/dashboard");
        toast.success("Welcome Customer!");
      } else {
        router.push("/employee");
        toast.success("Welcome Employee!");
      }
    } else {
      let message = "Login failed";
      try {
        const errorData = await res.json();
        if (res.status === 401) {
          message = "Invalid username or password";
        } else if (errorData?.message) {
          message = errorData.message;
        }
      } catch {}
      toast.error(message);
    }
  } catch (e) {
    toast.error("Unable to connect to server. Please try again later.");
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
          className="bg-litratoblack  text-white px-6 py-2 rounded-lg hover:cursor-pointer font-bold transition-all duration-200 hover:bg-black"
        >
          LOGIN
        </div>
        <div>Don't have an account? <a href="/registration">Register</a></div>
      </section>

      <LitratoFooter />
    </div>
  );
}
