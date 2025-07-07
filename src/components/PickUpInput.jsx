import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function BookNowButton() {
  const navigate = useNavigate();

  function handleBookNow() {
    navigate("/request");
  }

  return (
    <div className='w-full flex justify-center md:justify-start '>
      <div
        onClick={handleBookNow}
        className='cursor-pointer bg-[#c85f0b] hover:bg-[#fb8c3b] transition-colors duration-300 text-white font-semibold flex items-center justify-between px-6 py-3 rounded-full shadow-md min-w-[180px] max-w-[250px] w-full sm:w-auto'>
        <span className='text-base lg:text-lg'>Request a Pickup</span>
        <ArrowRight className='ml-2' />
      </div>
    </div>
  );
}

export default BookNowButton;
