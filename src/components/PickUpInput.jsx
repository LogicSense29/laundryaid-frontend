import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function BookNowButton() {
  const navigate = useNavigate();

  function handleBookNow() {
    navigate("/login");
  }

  return (
    <div className="w-full flex justify-center md:justify-start ">
      <div
        onClick={handleBookNow}
        className="cursor-pointer bg-[#c85f0b] hover:bg-[#fb8c3b] transition-colors duration-300 text-white font-semibold flex items-center justify-between px-6 py-3 rounded-full shadow-md w-5/6 md:w-1/2"
      >
        <span className="text-base sm:text-lg">Book Now</span>
        <ArrowRight className="ml-2" />
      </div>
    </div>
  );
}

export default BookNowButton;
