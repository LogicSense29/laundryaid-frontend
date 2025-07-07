import { Divide } from "lucide-react";
import { ClipLoader } from "react-spinners";

export function LoaderComponent({ loading }) {
  return (
    <div className='flex flex-col justify-center items-center min-h-32'>
      <ClipLoader
        color='#fb8c3b'
        loading={loading}
        size={40}
        className='text-primary'
      />
      ;
    </div>
  );
}
