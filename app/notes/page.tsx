import { Button } from "@/components/ui/button";
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
import { EllipsisVertical } from "lucide-react";
import React from "react";
import CreateNoteForm from "./_components/CreateNoteForm";
import { backendAPI } from "@/api";
import { currentUser } from "@clerk/nextjs/server";
import moment from "moment";

async function getNotes() {
  const clerkUser = await currentUser();

  const response = await backendAPI.get(`/notes/${clerkUser?.id}`);

  return response.data;
}

export default async function Page() {
  const { notes } = await getNotes();
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <CreateNoteForm />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4'>
          {notes.length > 0
            ? notes.map((note: any, index: any) => (
                <Notes
                  key={index}
                  title={note.title}
                  description={note.content}
                  footer={moment(note.updatedAt).fromNow()}
                />
              ))
            : "No notes found, create one!"}
        </div>
      </div>
    </>
  );
}

function Notes({
  title,
  description,
  footer,
}: {
  title: string;
  description: string;
  footer: string;
}) {
  return (
    <Card className='relative mb-4 break-inside-avoid border-2'>
      <CardHeader className='relative p-4 pb-6'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size='icon'
              variant='outline'
              className='absolute top-1 right-1 border-none'
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
  );
}
