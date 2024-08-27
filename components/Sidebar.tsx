"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Archive, Bell, StickyNote, Trash } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Card className='hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:px-2 lg:py-4 lg:h-full border-none'>
      <div>
        <ul className='flex flex-col items-center gap-4'>
          <li>
            <Link href='/notes'>
              <Button
                size='lg'
                variant={pathname === "/notes" ? "secondary" : "outline"}
                className='w-48'
              >
                <div className='flex items-center justify-center gap-2'>
                  <StickyNote />
                  <p className='text-pretty text-foreground'>Notes</p>
                </div>
              </Button>
            </Link>
          </li>
          <li>
            <Link href='/reminders'>
              <Button
                size='lg'
                variant={pathname === "/reminders" ? "secondary" : "outline"}
                className='w-48'
              >
                <div className='flex items-center justify-center gap-2'>
                  <Bell />
                  <p className='text-pretty text-foreground'>Reminders</p>
                </div>
              </Button>
            </Link>
          </li>
          <li>
            <Link href='/archive'>
              <Button
                size='lg'
                variant={pathname === "/archive" ? "secondary" : "outline"}
                className='w-48'
              >
                <div className='flex items-center justify-center gap-2'>
                  <Archive />
                  <p className='text-pretty text-foreground'>Archive</p>
                </div>
              </Button>
            </Link>
          </li>
          <li>
            <Link href='/trash'>
              <Button
                size='lg'
                variant={pathname === "/trash" ? "secondary" : "outline"}
                className='w-48'
              >
                <div className='flex items-center justify-center gap-2'>
                  <Trash />
                  <p className='text-pretty text-foreground'>Trash</p>
                </div>
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default Sidebar;
