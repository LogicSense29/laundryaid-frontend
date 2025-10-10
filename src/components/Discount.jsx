import React from "react";
import { Link } from "react-router-dom";

function Discount() {
  return (
    <section className='bg-white px-6 md:px-10 lg:px-16 py-10 md:pb-20 md:py-0 font-poppins'>
      <div
        data-aos='fade-up'
        className='relative flex flex-col justify-center items-center text-center bg-[url("/videos/hero1.gif")] bg-cover bg-center h-80 md:h-[24rem] rounded-xl overflow-hidden px-4 sm:px-10 py-8 gap-4'>
        {/* Overlay */}
        <div className='absolute inset-0 bg-black/50 z-10 rounded-xl' />

        {/* Content */}
        <div className='z-20 text-white space-y-2'>
          <h2 className='text-3xl md:text-3xl lg-text-4xl font-bold tracking-tight'>
            BOOK US TODAY
          </h2>
          <p className='text-2xl lg:text-3xl font-bold text-[#fb8c3b]'>
            {/* To get 40% Off your first booking */}
            Your laundry deserves the best and that's us.
          </p>
          <Link
            to='/request'
            className='inline-block mt-3 px-5 py-2 text-sm sm:text-base font-semibold rounded-lg bg-gradient-to-r from-[#c85f0b] via-[#f97a1d] to-[#fb8c3b] text-white shadow-md hover:opacity-90 transition'>
            Book Laundry Pickup
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Discount;
