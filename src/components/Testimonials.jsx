import { Quote } from "lucide-react";
import React from "react";

const testimonials = [
  {
    name: "Tolu A.",
    message:
      "The Wash & Fold package is a lifesaver! My clothes come back fresh and neatly folded every time.",
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
];

export default function Testimonials() {
  return (
    <div className="bg-gray-100 py-20 px-4 md:px-20 font-poppins">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#fb8c3b]">
        What Our Customers Say
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <Quote />
            <p className="text-gray-700 italic">{testimonial.message}</p>
            <div className="mt-4">
              <p className="font-semibold text-[#333]">{testimonial.name}</p>
              <p className="text-sm text-gray-500">
                {testimonial.packageUsed} Package
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// text-[#fb8c3b]
