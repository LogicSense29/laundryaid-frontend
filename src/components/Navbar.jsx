import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MapPinHouse,
  UserRoundPen,
  Menu,
  X,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { motion } from "motion/react";
import Logo from "../assets/laundryaid-logo.svg";

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: MapPinHouse },
    // { name: "Contact", path: "/contact", icon: UserRoundPen },
    // { name: "Dashboard", path: "/dashboard" }, // Optional: render conditionally if logged in
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`font-poppins fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 text-black shadow-sm"
          : "bg-transparent text-black"
      }`}>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <Link to='/' className='text-xl font-bold text-green-800'>
          <img src={Logo} alt='LaundryAid Logo' className='w-44 sm:w-52' />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-6 items-center'>
          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={`text-base flex flex-row items-center gap-2 font-medium hover:text-[#127733] hover:text-primary hover:scale-110 transition-transform duration-300 ${
                isActive(path) ? "text-[#127733] font-semibold" : ""
              }`}>
              {name}
              <Icon size={20} />
            </Link>
          ))}

          <div className='flex flex-row text-gray-900 gap-4'>
            <a
              href='https://web.facebook.com/people/Laundry-Aid/61550941633625/'
              target='_blank'
              className='flex flex-row items-center flex-wrap gap-2 hover:text-primary hover:scale-125 transition-transform duration-300'>
              {/* <p className='text-base'>Facebook</p> */}
              <Facebook size={20} />
            </a>
            <a
              href='https://www.instagram.com/laundryaidng'
              target='_blank'
              className='flex flex-row items-center flex-wrap gap-2 hover:text-primary hover:scale-125 transition-transform duration-300'>
              {/* <p className='text-base'>Instagram</p> */}
              <Instagram size={20} />
            </a>
            <a
              href='https://wa.me/2349048989787?text=Hi%2C%20I%27d%20love%20to%20request%20a%20Pickup'
              target='_blank'
              className='flex flex-row items-center flex-wrap gap-2 hover:text-primary hover:scale-125 transition-transform duration-300'>
              {/* <p className='text-base'>WhatsApp</p> */}
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className='md:hidden text-gray-700'
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          key='menu'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20, // controls the bounce
            duration: 0.4,
          }}
          className='rounded-2xl md:hidden w-3/5 flex flex-col items-center m-auto text-center bg-white p-6 text-sm'>
          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsOpen(false)}
              className={`text-base flex flex-row items-center gap-2 block py-2 ${
                isActive(path)
                  ? "text-[#127733] font-semibold"
                  : "text-gray-700"
              }`}>
              {name}
              <Icon size={16} />
            </Link>
          ))}

          {/* Would Arrange this later */}
          <div className='space-y-2'>
            <a
              href='https://web.facebook.com/people/Laundry-Aid/61550941633625/'
              target='_blank'
              className='flex flex-row items-center flex-wrap gap-2'>
              <p className='text-base'>Facebook</p>
              <Facebook size={16} />
            </a>
            <a
              href='https://www.instagram.com/laundryaidng'
              target='_blank'
              className='flex flex-row items-center flex-wrap gap-2'>
              <p className='text-base'>Instagram</p>
              <Instagram size={16} />
            </a>
            <a
              href='https://wa.me/2349048989787?text=Hi%2C%20I%27d%20love%20to%20request%20a%20Pickup'
              target='_blank'
              className='flex flex-row items-center flex-wrap gap-2'>
              <p className='text-base'>WhatsApp</p>
              <MessageCircle size={16} />
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
