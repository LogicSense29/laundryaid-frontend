import React from 'react'

function DiscountButton() {
  return (
    <div className='fixed bottom-15 md:bottom-10 left-6 md:left-10 z-50 font-poppins'>
      <div className='bg-black/40 rounded-2xl'>
        <p className='p-4 bg-gradient-to-r from-[#c85f0b] via-[#f97a1d] to-[#fb8c3b] rounded-2xl text-white drop-shadow-md'>
          Get 40% off
        </p>
      </div>
    </div>
  );
}

export default DiscountButton;

// If readability is your top concern, keep the gradient on a container, not on the <p> itself, 
// and apply a semi-transparent bg-black/30 with backdrop-blur-sm to the <p> or a wrapper.