"use client";
import LitratoBranding from "./Branding";
function LitratoFooter() {
  return (
    <div className="flex flex-col bg-litratoblack">
      <div className="flex flex-row justify-center gap-48 pt-10">
        <div className="text-white">
          <LitratoBranding></LitratoBranding>
        </div>
        <div className="flex flex-row gap-20 pt-10">
          <div className="flex flex-col text-white">
            <p>About Us</p>
            <p>Contact</p>
            <p>Location</p>
          </div>
          <div className="flex flex-col text-white">
            <p>FAQs</p>
            <p>Term of Use</p>
            <p>Privacy Policies</p>
          </div>
          <div className="flex flex-col text-white">
            <p>Services & Facilities</p>
            <p>How to Book</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-md mx-auto flex justify-center border-t-2 border-gray-600 py-4 mt-8 text-white px-4 text-center">
        © Copyright Booking Hotels. All rights reserved.
      </div>
    </div>
  );
}
export default LitratoFooter;
