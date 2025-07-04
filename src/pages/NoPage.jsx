import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 font-poppins bg-gray-100">
      <h1 className="text-6xl font-bold text-[#c85f0b] mb-4">404</h1>
      <p className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</p>
      <p className="text-gray-600 mb-6">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#127733] hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NoPage;
