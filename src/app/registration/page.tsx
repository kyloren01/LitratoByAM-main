"use client";
import Image from "next/image";
import LitratoBranding from "../../../Litratocomponents/Branding";
import LitratoFooter from "../../../Litratocomponents/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
    sex: "",
    username: "",
    password: "",
    confirmPassword: "",
  region: "",
  province: "",
  city: "",
  barangay: "",
  postalCode: "",
    contact: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    router.push("/home");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistered = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          firstname: form.firstname,
          lastname: form.lastname,
          birthdate: form.birthdate,
          sex: form.sex,
          region: form.region,
          province: form.province,
          city: form.city,
          barangay: form.barangay,
          postal_code: form.postalCode,
          contact: form.contact,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred");
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
      <form onSubmit={handleRegistered}>
        <div className="flex flex-row justify-center gap-8 mt-8 ">
          <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96">
            <label>
              Firstname:
              <input
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Juan"
                type="text"
                className="w-70 px-2 text-xl border-none outline-none bg-transparent"
              />
            </label>
          </div>
          <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96">
            <label>
              Lastname:
              <input
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Dela Cruz"
                type="text"
                className="w-70 px-2 text-xl border-none outline-none bg-transparent"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-8 mt-4 ">
          <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96">
            <label>
              Birthdate:
              <input
                name="birthdate"
                value={form.birthdate}
                onChange={handleChange}
                type="date"
                className="w-70 px-2 text-xl border-none outline-none bg-transparent"
                placeholder="MM/DD/YYYY"
              />
            </label>
          </div>
          <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96">
            <label>
              Sex:
              <input
                name="sex"
                value={form.sex}
                onChange={handleChange}
                placeholder="Male/Female"
                type="text"
                className="w-70 px-2 text-xl border-none outline-none bg-transparent"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4 gap-y-4 mb-8">
          <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200">
            <label>
              Username:
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="example@gmail.com"
                type="text"
                className="w-170 px-2 text-xl border-none outline-none bg-transparent"
              />
            </label>
          </div>
          <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200">
            <label>
              Password:
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Example1234"
                type="password"
                className="w-170 px-2 text-xl border-none outline-none bg-transparent"
              />
            </label>
          </div>
          <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200">
            <label>
              Confirm Password:
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Example1234"
                type="password"
                className="w-160 px-2 text-xl border-none outline-none bg-transparent"
              />
            </label>
          </div>
         <div className="flex flex-row"> 
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-full">
              <label>
                Region:
                <input
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  placeholder="Region XI"
                  type="text"
                  className="w-full px-2 text-xl border-none outline-none bg-transparent"
                />
              </label>
            </div>
            <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-full">
              <label>
                Province:
                <input
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  placeholder="Davao del Sur"
                  type="text"
                  className="w-full px-2 text-xl border-none outline-none bg-transparent"
                />
              </label>
            </div>
            <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-full">
              <label>
                City/Town:
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Davao City"
                  type="text"
                  className="w-full px-2 text-xl border-none outline-none bg-transparent"
                />
              </label>
            </div>
            <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-full">
              <label>
                Barangay:
                <input
                  name="barangay"
                  value={form.barangay}
                  onChange={handleChange}
                  placeholder="33-D"
                  type="text"
                  className="w-full px-2 text-xl border-none outline-none bg-transparent"
                />
              </label>
            </div>
            <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md md:col-span-1 w-full">
              <label>
                Postal Code:
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="8000"
                  type="text"
                  className="w-full px-2 text-xl border-none outline-none bg-transparent"
                />
              </label>
            </div>
          </div>
          </div>
          <div className="bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200">
            <label>
              Contact Number:
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="09******123"
                type="text"
                className="w-150 px-2 text-xl border-none outline-none bg-transparent"
              />
            </label>
          </div>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="flex flex-row justify-center gap-8 my-8 ">
          <div
            onClick={handleBack}
            className="bg-[#878787] text-litratoblack px-4 py-2 w-28 text-center rounded-lg hover:cursor-pointer font-bold"
          >
            Back
          </div>
          <button
            type="submit"
            className="bg-litratoblack text-white px-4 py-2 w-28 text-center rounded font-bold"
          >
            Register
          </button>
        </div>
      </form>
      <LitratoFooter />
    </div>
  );
}
