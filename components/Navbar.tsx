"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { LightbulbIcon, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      switch (pathname) {
        case "/notes":
          router.push(`/notes?q=${e.target.value}`);
          break;
        case "/archive":
          router.push(`/archive?q=${e.target.value}`);
          break;
        case "/reminders":
          router.push(`/reminders?q=${e.target.value}`);
          break;
        case "/trash":
          router.push(`/trash?q=${e.target.value}`);
          break;
        default:
          break;
      }
    }
  };
  return (
    <Card className='flex justify-between items-center p-4 rounded-none border-b-4'>
      <div className='flex items-center space-x-2'>
        <LightbulbIcon className='h-12 w-12 text-yellow-500' />
        <span className='font-bold text-xl'>Keep</span>
      </div>

      <div className='flex-grow mx-4 px-4'>
        <div className='relative w-full max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <Input
            type='text'
            placeholder='Search'
            className='w-full p-2 pl-10 rounded-md'
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  );
};

export default Navbar;
