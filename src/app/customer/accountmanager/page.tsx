"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function AccountManagementPage() {
  const router = useRouter();

  // ✅ Toggle between read-only and editable profile
  const [isEditable, setIsEditable] = useState(false);

  // ✅ User profile data (basic info)
  const [profile, setProfile] = useState<{
    username: string;
    email: string;
    role: string;
    url?: string;
  } | null>(null);

  // ✅ Default structure for user profile data
  const [originalForm, setOriginalForm] = useState({
    Firstname: "",
    Lastname: "",
    Birthdate: "",
    Sex: "",
    ContactNumber: "",
    Region: "",
    Province: "",
    City: "",
    Barangay: "",
    PostalCode: "",
  });

  // ✅ Form for handling password changes
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ✅ Track password change process
  const [changingPassword, setChangingPassword] = useState(false);

  // ✅ Editable version of personal data
  const [personalForm, setPersonalForm] = useState(originalForm);

  // ✅ Track when saving profile
  const [saving, setSaving] = useState(false);

  // 🔑 Personal details fields
  const personalInfo = [
    { label: "First Name", type: "text", key: "Firstname" },
    { label: "Last Name", type: "text", key: "Lastname" },
    { label: "Birthdate", type: "text", key: "Birthdate" },
    { label: "Sex", type: "text", key: "Sex" },
    { label: "Contact Number", type: "text", key: "ContactNumber" },
  ] as const;

  // 🔑 Address fields
  const addressInfo = [
    { label: "Region", type: "text", key: "Region" },
    { label: "Province", type: "text", key: "Province" },
    { label: "City/Town", type: "text", key: "City" },
    { label: "Barangay", type: "text", key: "Barangay" },
    { label: "Postal Code", type: "text", key: "PostalCode" },
  ] as const;

  // 🔑 Account settings fields (passwords)
  const accountSettings = [
    { label: "Old Password", type: "password" },
    { label: "New Password", type: "password" },
    { label: "Confirm Password", type: "password" },
  ];

  /**
   * ✅ Load profile data when component mounts
   */
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (!token) return;

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/getProfile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          // If unauthorized, clear token and redirect to login
          localStorage.removeItem("access_token");
          router.replace("/login");
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };

    load();
  }, [router]);

  /**
   * ✅ Fetch detailed user profile to fill form
   */
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(`${API_BASE}/api/auth/getProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const formData = {
          Firstname: data.firstname || "",
          Lastname: data.lastname || "",
          Birthdate: data.birthdate || "",
          Sex: data.sex || "",
          ContactNumber: data.contact || "",
          Region: data.region || "",
          Province: data.province || "",
          City: data.city || "",
          Barangay: data.barangay || "",
          PostalCode: data.postal_code || "",
        };

        setOriginalForm(formData); // store clean copy
        setPersonalForm(formData); // editable copy
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  /**
   * ✅ Helper function to display dates nicely
   */
  function formatReadableDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="h-screen p-4">
      <div className="flex flex-col p-4 justify-center gap-4">
        {/* ================= Profile Section ================= */}
        <div className="flex flex-col justify-center gap-2 items-center">
          {/* Profile picture */}
          <div className="flex bg-black h-30 w-30 rounded-full relative">
            <Image
              src={"/Images/hanz.png"}
              alt="profile pic"
              fill
              className="rounded-full"
            />
          </div>

          {/* Welcome text */}
          <p className="text-black text-center text-3xl font-semibold">
            Welcome, {personalForm.Firstname} {personalForm.Lastname ?? "User"}!
          </p>

          {/* Profile action buttons */}
          <div className="flex flex-row gap-6">
            {/* Edit / Cancel button */}
            <div
              onClick={() => {
                if (isEditable) {
                  // Cancel edit → reset form
                  setPersonalForm(originalForm);
                  setIsEditable(false);
                } else {
                  // Enable edit mode
                  setIsEditable(true);
                }
              }}
              className="bg-litratoblack rounded-full cursor-pointer py-2 px-4 text-white"
            >
              {isEditable ? "Cancel Edit" : "Edit Profile"}
            </div>

            {/* Save changes button (only visible in edit mode) */}
            {isEditable && (
              <button
                onClick={async () => {
                  setSaving(true);
                  try {
                    const token = localStorage.getItem("access_token");
                    const payload = {
                      firstname: personalForm.Firstname,
                      lastname: personalForm.Lastname,
                      birthdate: personalForm.Birthdate,
                      sex: personalForm.Sex,
                      contact: personalForm.ContactNumber,
                      region: personalForm.Region,
                      province: personalForm.Province,
                      city: personalForm.City,
                      barangay: personalForm.Barangay,
                      postal_code: personalForm.PostalCode,
                    };

                    const res = await fetch(
                      `${API_BASE}/api/auth/updateProfile`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(payload),
                      }
                    );

                    if (!res.ok) throw new Error("Failed to save");
                    const data = await res.json();

                    // Update state after successful save
                    const updated = {
                      Firstname: data.user?.firstname ?? personalForm.Firstname,
                      Lastname: data.user?.lastname ?? personalForm.Lastname,
                      Birthdate: data.user?.birthdate ?? personalForm.Birthdate,
                      Sex: data.user?.sex ?? personalForm.Sex,
                      ContactNumber:
                        data.user?.contact ?? personalForm.ContactNumber,
                      Region: data.user?.region ?? personalForm.Region,
                      Province: data.user?.province ?? personalForm.Province,
                      City: data.user?.city ?? personalForm.City,
                      Barangay: data.user?.barangay ?? personalForm.Barangay,
                      PostalCode:
                        data.user?.postal_code ?? personalForm.PostalCode,
                    };

                    setOriginalForm(updated);
                    setPersonalForm(updated);
                    setIsEditable(false);
                  } catch (e) {
                    console.error(e);
                    alert("Failed to save changes");
                  } finally {
                    setSaving(false);
                  }
                }}
                className={`rounded py-2 px-4 text-white ${
                  saving ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            )}

            {/* Change password button (triggers password form) */}
            <div className="bg-litratoblack rounded-full cursor-pointer py-2 px-4 text-white">
              Change Password
            </div>
          </div>
        </div>

        {/* ================= Change Password Button ================= */}
        {isEditable && (
          <button
            onClick={async () => {
              if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                alert("New password and confirmation do not match");
                return;
              }

              setChangingPassword(true);
              try {
                const token = localStorage.getItem("access_token");
                const res = await fetch(`${API_BASE}/api/auth/changePassword`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    oldPassword: passwordForm.oldPassword,
                    newPassword: passwordForm.newPassword,
                  }),
                });

                const data = await res.json();
                if (!res.ok)
                  throw new Error(data.message || "Failed to change password");

                alert("Password changed successfully!");
                setPasswordForm({
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              } catch (err: any) {
                alert(err.message || "Error changing password");
              } finally {
                setChangingPassword(false);
              }
            }}
            className={`rounded py-2 px-4 text-white ${
              changingPassword ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={changingPassword}
          >
            {changingPassword ? "Changing..." : "Change Password"}
          </button>
        )}

        {/* ================= Personal Info Section ================= */}
        <p className="text-2xl">Manage your account</p>
        <div className="flex flex-row gap-12 ">
          {personalInfo.map((field) => (
            <div key={field.label} className="flex flex-col w-auto">
              <label>{field.label}:</label>
              <input
                type={field.type}
                value={
                  field.key === "Birthdate" && personalForm.Birthdate
                    ? isEditable
                      ? personalForm.Birthdate
                      : formatReadableDate(personalForm.Birthdate)
                    : (personalForm as any)[field.key] ?? ""
                }
                onChange={(e) =>
                  setPersonalForm((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
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

        {/* ================= Address Info Section ================= */}
        <div className="flex flex-row gap-12">
          {addressInfo.map((field) => (
            <div key={field.label} className="flex flex-col w-auto">
              <label>{field.label}:</label>
              <input
                type={field.type}
                value={personalForm[field.key] ?? ""}
                onChange={(e) =>
                  setPersonalForm((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
                readOnly={!isEditable}
                className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
                  isEditable ? "bg-gray-200" : "bg-gray-100 text-gray-600"
                }`}
              />
            </div>
          ))}
        </div>

        {/* ================= Account Settings Section ================= */}
        <p className="text-2xl">Account Settings</p>
        <div className="flex flex-col gap-4 w-1/3">
          {accountSettings.map((field) => (
            <div key={field.label} className="flex flex-col">
              <label>{field.label}:</label>
              <input
                type={field.type}
                placeholder="Enter here:"
                value={
                  field.label === "Old Password"
                    ? passwordForm.oldPassword
                    : field.label === "New Password"
                    ? passwordForm.newPassword
                    : passwordForm.confirmPassword
                }
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    [field.label === "Old Password"
                      ? "oldPassword"
                      : field.label === "New Password"
                      ? "newPassword"
                      : "confirmPassword"]: e.target.value,
                  }))
                }
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
