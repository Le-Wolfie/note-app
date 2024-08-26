"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Bell, Lightbulb, Trash } from "lucide-react";

const Sidebar = () => {
  return (
    <Card className='hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:px-2 lg:py-4 lg:h-full lg:w-auto border-none'>
      <div>
        <ul className='flex flex-col items-center gap-4'>
          <li>
            <Link href='/'>
              <Button size='lg' variant={"outline"} className='w-48'>
                <div className='flex items-center justify-center gap-2'>
                  <Lightbulb />
                  <p className='text-pretty text-foreground'>Notes</p>
                </div>
              </Button>
            </Link>
          </li>
          <li>
            <Link href='/'>
              <Button size='lg' variant={"outline"} className='w-48'>
                <div className='flex items-center justify-center gap-2'>
                  <Bell />
                  <p className='text-pretty text-foreground'>Reminders</p>
                </div>
              </Button>
            </Link>
          </li>
          <li>
            <Link href='/'>
              <Button size='lg' variant={"outline"} className='w-48'>
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
