"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import EditNoteForm from "@/app/notes/_components/EditNoteForm";

export default function Notes({
  title,
  description,
  noteId,
  footer,
}: {
  title: string;
  description: string;
  noteId: string;
  footer: string;
}) {
  return (
    <EditNoteForm title={title} content={description} noteId={noteId}>
      <Card className='relative mb-4 break-inside-avoid border-2 hover:bg-primary-foreground transition-colors cursor-pointer'>
        <CardHeader className='relative p-4 pb-6'>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              onClick={(e) => e.stopPropagation()} // Prevents dialog from opening
            >
              <Button
                size='icon'
                variant='ghost'
                className='absolute top-1 right-1 border-none'
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CardTitle className='line-clamp-1 pr-10'>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='line-clamp-2'>
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <p className='text-sm text-pretty'>Updated {footer}</p>
        </CardFooter>
      </Card>
    </EditNoteForm>
  );
}
