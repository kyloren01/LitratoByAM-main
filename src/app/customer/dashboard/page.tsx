"use client";
import { HiOutlineExternalLink, HiOutlinePlusCircle } from "react-icons/hi";
import { FaRegFileAlt } from "react-icons/fa";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") ||
    "http://localhost:5000") + "/api/auth/getProfile";

export default function DashboardPage() {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [personalForm, setPersonalForm] = useState({
    Firstname: "",
    Lastname: "",
  });

  const [profile, setProfile] = useState<{
    username: string;
    email: string;
    role: string;
    url?: string;
    firstname?: string;
    lastname?: string;
  } | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    const ac = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${API_BASE}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: ac.signal,
        });

        if (res.status === 401) {
          try {
            localStorage.removeItem("access_token");
          } catch {}
          router.replace("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data);
        setPersonalForm({
          Firstname: data.firstname || "",
          Lastname: data.lastname || "",
        });
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        toast.error("Error fetching profile");
      }
    })();

    return () => ac.abort();
  }, [router]);

  const Carddetails = [
    { name: "Approved", content: "7" },
    { name: "Declined", content: "3" },
    { name: "Pending", content: "5" },
  ];
  const QuickActions = [
    {
      name: "Add Organization",
      icon: <HiOutlinePlusCircle className="text-xl mr-2" />,
    },
    { name: "View Logs", icon: <FaRegFileAlt className="mr-1" /> },
  ];
  const tabletitles = [
    "Event Name",
    "Date",
    "Start Time",
    "End Time",
    "Package",
    "Place",
    "Payment Status",
    "Actions",
  ];
  const tabledata = [
    {
      name: "Mary & John Wedding",
      date: "2023-10-01",
      startTime: "07:00 am",
      endTime: "09:00 am",
      package: "The Hanz",
      place: "Beach Resort",
      paymentStatus: "Paid",
      action: ["Cancel", "Reschedule"],
    },
    {
      name: "Mary & John Wedding",
      date: "2023-10-01",
      startTime: "07:00 am",
      endTime: "09:00 am",
      package: "The Hanz",
      place: "Beach Resort",
      paymentStatus: "Paid",
      action: ["Cancel", "Reschedule"],
    },
  ];
  return (
    <div className="flex flex-row gap-6 h-screen">
      <div></div>
      {/* Dashboad Section */}
      <div>
        <div className="flex flex-col gap-8 mt-12">
          <h1>
            Hello, {personalForm.Firstname} {personalForm.Lastname}!
          </h1>
          <div className="flex flex-col">
            <h5>Quick Actions</h5>
            <div className="flex flex-row gap-6">
              {QuickActions.map((action, i) => (
                <div
                  key={i}
                  className="bg-[#2563EB] w-full sm:w-[195px]  text-center justify-center items-center rounded-xl h-[50px] text-base"
                >
                  <div className="flex flex-row justify-center items-center text-white mt-[13px]">
                    {" "}
                    {action.icon}
                    {action.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h5>Quick Actions</h5>
            <div className="flex flex-row gap-6">
              {Carddetails.map((card, i) => (
                <Card
                  key={i}
                  className="h-32 w-72 border-black border-2 rounded-2xl bg-gray-300"
                >
                  <CardHeader className="flex flex-row items-center text-black text-lg font-medium justify-between">
                    {card.name}
                    <a href="">
                      <HiOutlineExternalLink className="text-black" />
                    </a>
                  </CardHeader>
                  <CardContent className="text-black text-4xl font-medium mt-[-10px]">
                    {card.content}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h5>Dashboard</h5>
            <div className="max-h-72 overflow-y-auto rounded-t-xl">
              <table className="w-full overflow-hidden">
                <thead>
                  <tr className=" bg-gray-300">
                    {tabletitles.map((title, i) => (
                      <th
                        className={`px-4 py-2 text-left ${
                          i === 0 ? "rounded-tl-xl" : ""
                        } ${
                          i === tabletitles.length - 1 ? "rounded-tr-xl" : ""
                        }`}
                        key={i}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tabledata.map((data, i) => (
                    <tr className="text-left bg-gray-100 " key={i}>
                      <td className="px-4 py-2 text-left">{data.name}</td>
                      <td className="px-4 py-2 text-left">{data.date}</td>
                      <td className="px-4 py-2 text-left">{data.startTime}</td>
                      <td className="px-4 py-2 text-left">{data.endTime}</td>
                      <td className="px-4 py-2 text-left">{data.package}</td>
                      <td className="px-4 py-2 text-left">{data.place}</td>
                      <td className="px-4 py-2 text-left">
                        {data.paymentStatus}
                      </td>
                      <td
                        className="
                      px-4 py-2 text-left flex gap-2"
                      >
                        {Array.isArray(data.action) && (
                          <>
                            <button className="bg-litratoblack text-white rounded px-2">
                              {data.action[0]}
                            </button>
                            <button className="bg-litratored text-white rounded px-2">
                              {data.action[1]}
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
