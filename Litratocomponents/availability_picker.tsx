"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
function Datepicker() {
  const router = useRouter();
  const availability = () => {
    router.push("/availability");
  };
  return (
    <div className="flex flex-row gap-2">
      <Image
        onClick={availability}
        width={40}
        height={40}
        className="hover:cursor-pointer h-10 mt-2"
        src="/Icons/datepicker.png"
        alt="icon_img"
      />
      <p className="font-bold mt-3">Check Available Date</p>
    </div>
  );
}
export default Datepicker;
