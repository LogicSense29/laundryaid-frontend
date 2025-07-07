import React from "react";
import PickUpInput from "./PickUpInput";

function Header() {
  return (
    <div className='h-auto flex flex-col sm:flex-col md:flex-row justify-between items-center px-6 sm:px-10 md:px-10 lg:px-16 font-poppins bg-gradient-to-b sm:bg-gradient-to-r from-[#CFE3D6] via-[#a7cdb7] to-[#7cbf9e]'>
      {/* Left Side */}
      <div className='md:w-1/2 flex flex-col gap-4 sm:gap-6 md:gap-2 sm:pt-3'>
        <h1 className='font-bold text-4xl sm:text-4xl md:text-4xl lg:text-6xl text-center md:text-left header_text'>
          Less Time on Laundry, More Time for What Matters
        </h1>
        <p className='text-center md:text-left text-gray-700'>
          We pickup, wash, and deliver your clothes back fresh and clean.
        </p>

        <div className='relative flex justify-center sm:justify-start mt-2'>
          <PickUpInput />

          {/* Arrow & Note (Desktop only) */}
          <div className='absolute hidden md:block md:translate-x-60 lg:translate-x-65 top-0 rotate-12 book_arrow'>
            <span className='font-caveat text-2xl text-primary'>
              Book in 60 secs
            </span>
            <img
              src='/hand-drawn-spiral-arrow.png'
              alt='arrow'
              className='w-20 scale-x-[-1]'
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='md:w-1/2 max-h-full flex justify-center self-end sm:mt-0'>
        <img
          src='/hero-image.png'
          alt='Laundry Hero'
          className='  object-cover'
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
