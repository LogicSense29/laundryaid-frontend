import { Divide } from "lucide-react";
import { ClipLoader } from "react-spinners";

export function LoaderComponent({ loading, type }) {
  return (
    <div className='flex flex-col justify-center items-center min-h-32'>
      <ClipLoader
        color='#fb8c3b'
        loading={loading}
        size={type == 'small' ? 12 : 40}
        className='text-primary'
      />
      ;
    </div>
  );
}
