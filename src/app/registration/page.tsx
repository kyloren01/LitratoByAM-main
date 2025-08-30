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

  const fieldRows = [
    [
      {
        name: "firstname",
        label: "Firstname:",
        placeholder: "Juan",
        type: "text",
        className: "w-70 px-2 text-xl border-none outline-none bg-transparent",
        containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96",
      },
      {
        name: "lastname",
        label: "Lastname:",
        placeholder: "Dela Cruz",
        type: "text",
        className: "w-70 px-2 text-xl border-none outline-none bg-transparent",
        containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96",
      },
    ],
    [
      {
        name: "birthdate",
        label: "Birthdate:",
        placeholder: "MM/DD/YYYY",
        type: "date",
        className: "w-70 px-2 text-xl border-none outline-none bg-transparent",
        containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96",
      },
      {
        name: "sex",
        label: "Sex:",
        placeholder: "Male/Female",
        type: "text",
        className: "w-70 px-2 text-xl border-none outline-none bg-transparent",
        containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-96",
      },
    ],
  ];

  const singleFields = [
    {
      name: "username",
      label: "Username:",
      placeholder: "example@gmail.com",
      type: "text",
      className: "w-170 px-2 text-xl border-none outline-none bg-transparent",
      containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200",
    },
    {
      name: "password",
      label: "Password:",
      placeholder: "Example1234",
      type: "password",
      className: "w-170 px-2 text-xl border-none outline-none bg-transparent",
      containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password:",
      placeholder: "Example1234",
      type: "password",
      className: "w-160 px-2 text-xl border-none outline-none bg-transparent",
      containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200",
    },
  ];

  const regionProvinceFields = [
    {
      name: "region",
      label: "Region:",
      placeholder: "Region XI",
      type: "text",
      className: "w-60 px-2 text-xl border-none outline-none bg-transparent",
      containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-94",
    },
    {
      name: "province",
      label: "Province:",
      placeholder: "Davao del Sur",
      type: "text",
      className: "w-60 px-2 text-xl border-none outline-none bg-transparent",
      containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-94",
    },
  ];

  const cityFields = [
    {
      name: "city",
      label: "City/Town:",
      placeholder: "Davao City",
      type: "text",
      className: "w-30 px-2 text-xl border-none outline-none bg-transparent",
      containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-60",
    },
    {
      name: "barangay",
      label: "Barangay:",
      placeholder: "33-D",
      type: "text",
      className: "w-30 px-2 text-xl border-none outline-none bg-transparent",
      containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-60",
    },
    {
      name: "postalCode",
      label: "Postal Code:",
      placeholder: "8000",
      type: "text",
      className: "w-30 px-2 text-xl border-none outline-none bg-transparent",
      containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-60",
    },
  ];

  const contactField = {
    name: "contact",
    label: "Contact Number:",
    placeholder: "09******123",
    type: "text",
    className: "w-150 px-2 text-xl border-none outline-none bg-transparent",
    containerClass: "bg-[#D9D9D9] p-2 rounded-lg shadow-md w-200",
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
        {/* Map fieldRows for first two rows */}
        {fieldRows.map((row, idx) => (
          <div key={idx} className="flex flex-row justify-center gap-8 mt-4 ">
            {row.map((field) => (
              <div key={field.name} className={field.containerClass}>
                <label>
                  {field.label}
                  <input
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    type={field.type}
                    className={field.className}
                  />
                </label>
              </div>
            ))}
          </div>
        ))}
        {/* Map singleFields */}
        <div className="flex flex-col items-center mt-4 gap-y-4 mb-8">
          {singleFields.map((field) => (
            <div key={field.name} className={field.containerClass}>
              <label>
                {field.label}
                <input
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  type={field.type}
                  className={field.className}
                />
              </label>
            </div>
          ))}
          {/* Region/Province row */}
          <div className="flex flex-row gap-12">
            {regionProvinceFields.map((field) => (
              <div key={field.name} className={field.containerClass}>
                <label>
                  {field.label}
                  <input
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    type={field.type}
                    className={field.className}
                  />
                </label>
              </div>
            ))}
          </div>
          {/* City/Barangay/Postal row */}
          <div className="flex flex-row gap-10">
            {cityFields.map((field) => (
              <div key={field.name} className={field.containerClass}>
                <label>
                  {field.label}
                  <input
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    type={field.type}
                    className={field.className}
                  />
                </label>
              </div>
            ))}
          </div>
          {/* Contact field */}
          <div className={contactField.containerClass}>
            <label>
              {contactField.label}
              <input
                name={contactField.name}
                value={form[contactField.name as keyof typeof form]}
                onChange={handleChange}
                placeholder={contactField.placeholder}
                type={contactField.type}
                className={contactField.className}
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
