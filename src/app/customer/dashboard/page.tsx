"use client";
import Image from "next/image";
import { HiOutlineExternalLink, HiOutlinePlusCircle } from "react-icons/hi";
import { FaRegFileAlt } from "react-icons/fa";
import LitratoSidebar from "../../../../Litratocomponents/sidebar";
import PromoCard from "../../../../Litratocomponents/Service_Card";
import Calendar from "../../../../Litratocomponents/LitratoCalendar";
import Timepicker from "../../../../Litratocomponents/Timepicker";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function DashboardPage() {
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
    },
    {
      name: "Mary & John Wedding",
      date: "2023-10-01",
      startTime: "07:00 am",
      endTime: "09:00 am",
      package: "The Hanz",
      place: "Beach Resort",
      paymentStatus: "Paid",
    },
  ];
  return (
    <div className="flex flex-row gap-6 h-screen">
      <div></div>
      {/* Dashboad Section */}
      <div>
        <div className="flex flex-col gap-8 mt-12">
          <h1>Hello, Valued Customer!</h1>
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
                  <tr className="font-serif bg-gray-300">
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
                    <tr className="text-left bg-gray-100" key={i}>
                      <td className="px-4 py-2 text-left">{data.name}</td>
                      <td className="px-4 py-2 text-left">{data.date}</td>
                      <td className="px-4 py-2 text-left">{data.startTime}</td>
                      <td className="px-4 py-2 text-left">{data.endTime}</td>
                      <td className="px-4 py-2 text-left">{data.package}</td>
                      <td className="px-4 py-2 text-left">{data.place}</td>
                      <td className="px-4 py-2 text-left">
                        {data.paymentStatus}
                      </td>
                      <td>
                        <select className="px-4 py-2">
                          <option></option>
                          <option>Reschedule</option>
                          <option>Cancel</option>
                        </select>
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
