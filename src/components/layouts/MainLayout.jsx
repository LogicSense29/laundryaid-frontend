import React, { useState, useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DiscountButton from "../DiscountButton";
import Footer from "../Footer";
import Navbar from "../Navbar";


function MainLayout() {
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    const current = triggerRef.current;
    if (current) observer.observe(current);

    return () => current && observer.unobserve(current);
  }, []);

  // These routes use the hero gradient (landing pages like homepage)
  const showGradientLayout = location.pathname === "/";

  return (
    <>
      {/* {
        <Modal />
      } */}

      <div className='relative min-h-screen flex flex-col'>
        {/* Gradient on load screen only */}
        {showGradientLayout ? (
          <div className='bg-gradient-to-b sm:bg-gradient-to-r from-[#CFE3D6] via-[#a7cdb7] to-[#7cbf9e] min-h-screen'>
            <Navbar scrolled={scrolled} />
            <div ref={triggerRef} className='h-1 w-full pointer-events-none' />
            <main className='pt-20'>
              <Outlet />
            </main>
               <Footer />
          </div>
        ) : (
          <div className='flex-1 bg-[#e7f1ea]'>
            <Navbar scrolled={scrolled} />
            <div ref={triggerRef} className='h-1 w-full pointer-events-none' />
            <main className='pt-20 px-4 sm:px-8 md:px-40 lg:px-60'>
              <Outlet />
            </main>
          </div>
        )}

     
        {/* {scrolled && <DiscountButton />} */}
      </div>
    </>
  );
}

export default MainLayout;
