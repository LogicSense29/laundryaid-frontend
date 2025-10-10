import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

function Pricing() {
  const packages = [
    {
      type: "Wash & Fold",
      description:
        "Perfect for your everyday laundry needs. We wash, remove stains, and fold your clothes neatly, saving you time and effort.",
      benefits: [
        "Washing",
        "Stain Removal",
        "Fold",
        "Free pick up & delivery",
        "72hr clothe return",
      ],
      amount: "₦6,000",
    },
    {
      type: "Premium",
      description:
        "Ideal for delicate or high-value clothing. Includes deep cleaning, ironing, starching, and professional garment treatment.",
      benefits: [
        "Washing",
        "Stain Removal",
        "Ironing",
        "Starching",
        "Clothe Treatment",
        "Dry Cleaning",
        "Free pick up & delivery",
        "72hr clothe return",
      ],
      amount: "₦25,000",
    },
    {
      type: "Deluxe",
      description:
        "A great choice for a polished look. Enjoy clean, crisp, and fresh-smelling clothes with washing, ironing, stain removal, and starching all in one package.",
      benefits: [
        "Washing",
        "Stain Removal",
        "Ironing",
        "Starching",
        "Free pick up & delivery",
        "72hr clothe return",
      ],
      amount: "₦10,000",
    },
  ];

  return (
    <section className=' px-6 md:px-10 lg:px-16 py-6 md:pb-7 lg:py-20 font-poppins bg-white'>
      <h2 className='text-3xl font-bold text-[#127733] text-center mb-10'>
        Packages & Pricing
      </h2>

      <div data-aos='fade-up' className='flex flex-col md:flex-row gap-6'>
        {packages.map((item, index) => (
          <div
            key={index}
            className='flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-md flex flex-col justify-between'>
            {/* Header */}
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-md text-sm font-semibold text-white ${
                  index === 1 ? "bg-[#fb8c3b]" : "bg-[#127733]"
                }`}>
                {item.type}
              </span>

              <p className='mt-4 text-gray-600 text-sm'>{item.description}</p>
            </div>

            {/* Price */}
            <div className='mt-6 text-2xl font-semibold text-[#127733]'>
              {item.amount}
              <span className='text-sm font-normal text-gray-400'>
                /month
              </span>
            </div>

            {/* Benefits */}
            <ul className='border-t border-b border-gray-200 py-5 mt-4 space-y-2 text-sm text-gray-700'>
              {item.benefits.map((benefit, i) => (
                <li key={i} className='flex items-center gap-2'>
                  <Check size={16} className='text-green-600' />
                  {i == 0 ? `${benefit} (Up to 80 clothes)` : benefit}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className='mt-6'>
              <Link
                to='/request'
                className={`block w-full text-center py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  index === 1
                    ? "bg-gradient-to-r from-[#c85f0b] via-[#f97a1d] to-[#fb8c3b] text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-[#c85f0b]"
                }`}>
                Get Started
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
