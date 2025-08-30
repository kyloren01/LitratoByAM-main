"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { is } from "date-fns/locale";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function AccountManagementPage() {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [isPassEditable, setIsPassEditable] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  const handleSavePass = () => {};
  const [profile, setProfile] = useState<{
    username: string;
    email: string;
    role: string;
    url?: string;
  } | null>(null);

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

  const [passForm, setPassForm] = useState({
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });
  const [personalForm, setPersonalForm] = useState(originalForm);

  const [saving, setSaving] = useState(false);

  const personalData = [personalForm];

  const personalInfo = [
    { label: "First Name", type: "text", key: "Firstname" },
    { label: "Last Name", type: "text", key: "Lastname" },
    { label: "Birthdate", type: "text", key: "Birthdate" },
    { label: "Sex", type: "text", key: "Sex" },
    { label: "Contact Number", type: "text", key: "ContactNumber" },
  ] as const;

  const addressInfo = [
    { label: "Region", type: "text", key: "Region" },
    { label: "Province", type: "text", key: "Province" },
    { label: "City/Town", type: "text", key: "City" },
    { label: "Barangay", type: "text", key: "Barangay" },
    { label: "Postal Code", type: "text", key: "PostalCode" },
  ] as const;

  const accountSettings = [
    { label: "Old Password", type: "password", key: "OldPassword" },
    { label: "New Password", type: "password", key: "NewPassword" },
    { label: "Confirm Password", type: "password", key: "ConfirmPassword" },
  ] as const;

  // Load profile data on mount
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (!token) return; // no token, skip

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/getProfile`, {
          headers: { Authorization: `Bearer ${token}` }, // add Bearer prefix
        });

        if (res.status === 401) {
          try {
            localStorage.removeItem("access_token");
          } catch {}
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

  // Fetch user profile
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

        setOriginalForm(formData);
        setPersonalForm(formData);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  function formatReadableDate(isoString: string): string {
    const date = new Date(isoString);

    // Format: "Aug 18 2003"
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="h-screen p-4">
      <div className="flex flex-col p-4 justify-center gap-4">
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
            Welcome, {personalForm.Firstname} {personalForm.Lastname ?? "User"}!
          </p>
          {/* {profile?.email ? (
            <p className="text-gray-600 text-sm">Username: {profile.email}</p>
          ) : null} */}
          <div className="flex flex-row gap-6">
            <div
              onClick={() => {
                if (isEditable) {
                  // Cancel -> reset form
                  setPersonalForm(originalForm);
                  setIsEditable(false);
                } else {
                  // Edit mode
                  setIsEditable(true);
                }
              }}
              className="bg-litratoblack rounded-full cursor-pointer py-2 px-4 text-white"
            >
              {isEditable ? "Cancel Edit" : "Edit Profile"}
            </div>
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

                    // Update both states after saving
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
            <div
              onClick={() => {
                if (isPassEditable) {
                  // Cancel -> reset password form
                  setPassForm({
                    OldPassword: "",
                    NewPassword: "",
                    ConfirmPassword: "",
                  });
                  setIsPassEditable(false);
                } else {
                  // Enable only password fields
                  setIsPassEditable(true);
                }
              }}
              className="bg-litratoblack rounded-full cursor-pointer py-2 px-4 text-white"
            >
              Change Password{" "}
            </div>
          </div>
        </div>

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
                readOnly={!isEditable} // 🔑 only read-only, not fully disabled
                className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
                  isEditable ? "bg-gray-200" : "bg-gray-100 text-gray-600"
                }`}
              />
            </div>
          ))}
        </div>

        <p className="text-2xl">Account Settings</p>
        <div className="flex flex-col gap-4 w-1/3">
          {accountSettings.map((field) => (
            <div key={field.label} className="flex flex-col">
              <label>{field.label}:</label>
              <input
                type={field.type}
                placeholder="Enter here:"
                value={passForm[field.key]}
                onChange={(e) =>
                  setPassForm((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
                disabled={!isPassEditable}
                className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
                  isPassEditable
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
