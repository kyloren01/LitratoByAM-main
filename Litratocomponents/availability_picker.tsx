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
    <div className="flex flex-col items-center">
      <Image
        onClick={availability}
        width={40}
        height={40}
        className="hover:cursor-pointer hover:scale-120 duration-500 h-10"
        src="/Icons/datepicker.png"
        alt="icon_img"
      />
      <p className="font-bold mt-3">Check Available Date</p>
    </div>
  );
}
export default Datepicker;
