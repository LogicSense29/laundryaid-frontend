import { X } from 'lucide-react';
import React from 'react'

function Modal({isOpen, onClose , content : Content}) {
    if (!isOpen) return null;

  return (
    <div className='fixed w-full  inset-0 bg-black/40 flex flex-col justify-center items-center overflow-hidden z-100'>
      <div className='overflow-hidden'>
      <X/>
      {children}
      </div>
    </div>
  );
}

export default Modal
