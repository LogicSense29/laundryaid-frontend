import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestForm from "@/components/RequestForm";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("book");

  const bookings = [
    {
      id: 1,
      service: "Premium",
      pickupDate: "2025-06-26",
      deliveryDate: "2025-06-29",
      status: "Processing",
    },
    {
      id: 2,
      service: "Wash & Fold",
      pickupDate: "2025-06-21",
      deliveryDate: "2025-06-24",
      status: "Delivered",
    },
  ];

  const statusSteps = ["New", "Processing", "Ready", "Delivered"];

  const hasUpcomingDelivery = bookings.some((b) => {
    const deliveryTime = new Date(b.deliveryDate).getTime();
    const now = Date.now();
    return deliveryTime - now <= 2 * 86400000 && deliveryTime > now;
  });

  return (
    <div className="max-w-2xl mx-auto pt-20 p-4 font-poppins">
      {/* Tab Switcher */}
      <div className="mb-6 flex justify-between bg-gray-100 rounded-full overflow-hidden text-sm">
        <button
          className={`w-1/2 py-2 ${
            activeTab === "home" ? "bg-[#c85f0b] text-white" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("home")}
        >
          Dashboard
        </button>
        <button
          className={`w-1/2 py-2 ${
            activeTab === "book" ? "bg-[#127733] text-white" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("book")}
        >
          Book Laundry
        </button>
      </div>

      {/* --- Home Dashboard Tab --- */}
      {activeTab === "home" && (
        <>
          <h2 className="text-xl font-bold text-[#03170a] mb-4">
            Welcome back 👋
          </h2>

          {/* 🔔 Delivery Reminder */}
          {hasUpcomingDelivery && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-4 text-sm">
              📦 Reminder: You have a delivery arriving in the next 48 hours.
            </div>
          )}

          {/* 📊 Booking Summary */}
          <div className="bg-green-50 p-4 rounded-xl shadow mb-6 text-sm">
            <p className="font-semibold text-[#03170a] mb-1">
              📊 Booking Summary
            </p>
            <p>Total Bookings: {bookings.length}</p>
            <p>
              Pending:{" "}
              {
                bookings.filter((b) => b.status.toLowerCase() !== "delivered")
                  .length
              }{" "}
              • Delivered:{" "}
              {
                bookings.filter((b) => b.status.toLowerCase() === "delivered")
                  .length
              }
            </p>
          </div>

          {/* 📦 Recent Bookings */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-2">Recent Bookings</h3>
            {bookings.map((booking) => {
              const currentStepIndex = statusSteps.findIndex(
                (s) => s.toLowerCase() === booking.status.toLowerCase()
              );

              return (
                <div
                  key={booking.id}
                  className="border-b py-2 text-sm flex flex-col gap-2"
                >
                  <div className="flex justify-between sm:flex-row flex-col sm:items-center">
                    <div>
                      <span className="block font-semibold">
                        {booking.service}
                      </span>
                      <span className="text-gray-500 text-xs">
                        Pickup: {booking.pickupDate} • Delivery:{" "}
                        {booking.deliveryDate}
                      </span>
                    </div>
                    <span
                      className={`font-semibold mt-1 sm:mt-0 ${
                        booking.status === "Delivered"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        booking.status === "Delivered"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                      style={{
                        width: `${
                          ((currentStepIndex + 1) / statusSteps.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Logout Button */}
          <button
            onClick={() => navigate("/auth")}
            className="mt-6 w-full py-2 border border-red-500 text-red-600 rounded-xl"
          >
            Logout
          </button>
        </>
      )}

      {/* --- Book Laundry Tab --- */}
      {activeTab === "book" && <RequestForm />}
    </div>
  );
}
