import React from "react";

const services = [
  {
    image: "/pickup-laundryaid.jpg",
    title: "We Pick Up",
    description:
      "We come to your doorstep to collect your laundry, so you don’t have to lift a finger.",
  },
  {
    image: "/washandfold-laundryaid.jpg",
    title: "We Wash",
    description:
      "Your laundry gets our full attention. We wash and care for your clothes like they’re our own.",
  },
  {
    image: "/dry-cleaning-laundryaid.jpg",
    title: "We Dry Clean",
    description:
      "Expert dry cleaning for your delicate and special garments, handled with care.",
  },
];

function Services() {
  return (
    <section className="bg-white py-12 px-6 sm:px-10 md:px-20 font-poppins">
      <h2 className="text-3xl font-bold text-[#127733] text-center mb-10">
        Our Services
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {services.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-white rounded-xl shadow-sm border hover:shadow-md transition p-4"
          >
            <div
              className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-md mb-4"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <h3 className="text-lg font-semibold text-[#fb8c3b] mb-1">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
