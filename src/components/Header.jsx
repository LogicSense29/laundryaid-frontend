import React from "react";
import PickUpInput from "./PickUpInput";

function Header() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-end items-center px-6 sm:px-10 md:px-16 font-poppins bg-gradient-to-b sm:bg-gradient-to-r from-[#CFE3D6] via-[#a7cdb7] to-[#7cbf9e]">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col gap-4 sm:gap-6  sm:pt-3">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl text-center sm:text-left ">
          Less Time on Laundry, <br className="hidden sm:block" />
          More Time for What Matters
        </h1>
        <p className="text-center sm:text-left text-gray-700">
          We pickup, wash, and deliver your clothes back fresh and clean.
        </p>

        <div className="relative flex justify-center sm:justify-start mt-2">
          <PickUpInput />

          {/* Arrow & Note (Desktop only) */}
          <div className="absolute hidden md:block sm:translate-x-80 top-0 rotate-12">
            <span className="font-caveat text-2xl text-primary">
              Book in 60 secs
            </span>
            <img
              src="/hand-drawn-spiral-arrow.png"
              alt="arrow"
              className="w-20 scale-x-[-1]"
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-center sm:justify-end sm:mt-0">
        <img
          src="/hero-image.png"
          alt="Laundry Hero"
          className="  object-cover"
        />
      </div>
    </div>
  );
}

export default Header;

// max-w-[300px]
// sm:max-w-[350px] md:max-w-[400px]
// mt-10
// p-24
