import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Tolu A.",
    message:
      "The Wash & Fold package is a lifesaver! My clothes come back neatly folded every time.",
    packageUsed: "WASH & FOLD",
  },
  {
    name: "Mrs. Chika N.",
    message:
      "My silk blouses and suits are handled with so much care. I love how my clothes feel brand new.",
    packageUsed: "Premium",
  },
  {
    name: "David O.",
    message:
      "I use the Deluxe plan weekly and it’s worth every naira. My clothes are always clean and crisp.",
    packageUsed: "Deluxe",
  },
  {
    name: "Zainab K.",
    message:
      "Customer service to delivery, everything is top-notch. I used to hate laundry—now I don’t worry!",
    packageUsed: "Premium",
  },
];

export default function TestimonialCarousel() {
  return (
    <section className='bg-green-50 px-6 sm:px-10 md:px-10 lg:px-16 py-12 md:py-15 lg:py-20 font-poppins'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-10 text-primary'>
        What Our Customers Say
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        speed={900}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}>
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className='bg-white h-full rounded-xl shadow-lg p-6 sm:p-8 flex flex-col justify-between'>
              <Quote className='text-[#fb8c3b] mb-2' />
              <p className='text-gray-700 italic mb-6 leading-relaxed'>
                {testimonial.message}
              </p>
              <div className='mt-auto'>
                <p className='font-semibold text-[#03170a]'>
                  {testimonial.name}
                </p>
                <p className='text-sm text-gray-500'>
                  {testimonial.packageUsed} Package
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
