"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Archive, Bell, StickyNote, Trash, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        onClick={toggleMobileMenu}
        className={
          (cn("top-4 left-4 z-50"), isMobileMenuOpen ? "hidden" : "lg:hidden")
        }
      >
        <Menu />
      </Button>

      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 shadow-lg transform transition-transform lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Card className='h-full border-none flex flex-col py-4 relative'>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleMobileMenu}
            className=''
          >
            <X />
          </Button>

          <ul className='flex flex-col items-center gap-4'>
            <li>
              <Link href='/notes' onClick={() => setIsMobileMenuOpen(false)}>
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
              <Link
                href='/reminders'
                onClick={() => setIsMobileMenuOpen(false)}
              >
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
              <Link href='/archive' onClick={() => setIsMobileMenuOpen(false)}>
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
              <Link href='/trash' onClick={() => setIsMobileMenuOpen(false)}>
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
        </Card>
      </div>
    </>
  );
};

export default MobileSidebar;
