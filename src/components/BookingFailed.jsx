import React from 'react'
import { Annoyed, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

function BookingFailed({message}) {
  return (
    <div className='font-poppins flex flex-col justify-center items-center text-gray-700 min-h-32'>
      <AlertTriangle size={50} className='text-red-600' />
      <div className='text-center'>
        <p className='font-bold font-base'>{message}</p>
        <Link to='/' className='text-sm text-primary underline'>
          Go back Home
        </Link>
      </div>
    </div>
  );
}

export default BookingFailed