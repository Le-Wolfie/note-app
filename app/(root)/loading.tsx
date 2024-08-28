import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className='flex justify-center w-full h-full'>
      <Loader2 className='size-12 animate-spin' />
    </div>
  );
}
