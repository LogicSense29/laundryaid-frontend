import React from "react";
import Logo from "../assets/laundryaid-logo.svg";
import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className='bg-[#03170a] text-white py-10 px-6 md:px-20 font-poppins'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
        {/* Brand Info */}
        <div>
          {/* <h3 className="text-xl font-bold mb-3">CleanCare Laundry</h3> */}
          <div className='mb-3'>
            <Link to='/' className='text-xl font-bold text-indigo-700'>
              <img src={Logo} alt='laundry-aid-logo' width={150} />
            </Link>
          </div>
          <p className='text-sm text-gray-300'>
            Bringing freshness and care to every fabric. Fast, reliable, and
            affordable laundry services.
          </p>
        </div>

        {/* Quick Links */}
        {/* <div>
          <h4 className="font-semibold mb-3 text-[#c85f0b]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Locations
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div> */}

        {/* Services */}
        <div>
          <h4 className='font-semibold mb-3 text-[#c85f0b]'>Services</h4>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li>
              {" "}
              <Link to={"/request"}>Wash & Fold</Link>
            </li>
            <li>
              {" "}
              <Link to={"/request"}>Premium</Link>
            </li>{" "}
            <li>
              {" "}
              <Link to={"/request"}>Deluxe</Link>
            </li>
            <li>
              {" "}
              <Link to={"/become-a-vendor"}>Become a Vendor</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className='font-semibold mb-3 text-[#c85f0b]'>Contact Us</h4>
          <p className='text-sm text-gray-300'>No 1, St Mary Street off Alaafin Avenue, Oluyole behind Bovas Petrol Station, Ibadan, Oyo</p>
          <p className='text-sm text-gray-300 mt-1'>
            Email: info@laundryaid.com.ng
          </p>
          <p className='text-sm text-gray-300 mt-1'>Phone: +2349048989787</p>
        </div>

        {/* Socials */}
        <div>
          <h4 className='font-semibold mb-3 text-[#c85f0b]'>Socials</h4>
          <div className='space-y-2'>
            <a
              href='https://web.facebook.com/people/Laundry-Aid/61550941633625/'
              target='_blank'
              className='flex flex-row items-center flex-wrap text-gray-300 gap-2'>
              <Facebook size={16} />
              <p className='text-sm text-gray-300'>Facebook</p>
            </a>
            <a
              href='https://www.instagram.com/laundryaidng'
              target='_blank'
              className='flex flex-row items-center flex-wrap text-gray-300 gap-2'>
              <Instagram size={16} />
              <p className='text-sm text-gray-300'>Instagram</p>
            </a>
            <a
              href='https://wa.me/2349048989787?text=Hi%2C%20I%27d%20love%20to%20request%20a%20Pickup'
              target='_blank'
              className='flex flex-row items-center flex-wrap text-gray-300 gap-2'>
              <MessageCircle size={16} />
              <p className='text-sm text-gray-300'>WhatsApp</p>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className='mt-10 border-t border-gray-600 pt-4 text-center text-sm text-gray-400'>
        &copy; {new Date().getFullYear()} LaundryAid. All rights reserved.
      </div>
    </footer>
  );
}
