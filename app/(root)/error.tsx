"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/notes");
  }, [error, router]);

  return (
    <div className='flex justify-center w-full h-full'>
      <h1 className='text-3xl text-center'>
        An error occurred, try refreshing the page.
      </h1>
    </div>
  );
}
