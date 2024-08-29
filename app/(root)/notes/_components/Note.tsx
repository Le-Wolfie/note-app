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
import EditNoteForm from "@/app/(root)/notes/_components/EditNoteForm";
import ArchiveNoteForm from "./ArchiveNoteForm";
import DeleteNoteForm from "./DeleteNoteForm";
import { useState } from "react";
import moment from "moment";
import { ObjectId } from "mongoose";

type Props = {
  note: {
    _id: any;
    title: string;
    content: string;
    noteId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: ObjectId;
    reminder: Date;
    markedForDeletion: boolean;
    markedAsArchived: boolean;
  };
};

export default function Notes({ note }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <EditNoteForm
      title={note.title}
      content={note.content}
      noteId={note._id}
      reminder={note.reminder}
    >
      <Card className='relative mb-4 break-inside-avoid border-2 hover:bg-primary-foreground transition-colors cursor-pointer'>
        <CardHeader className='relative p-4 pb-6'>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
            <DropdownMenuContent
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              {!note.markedForDeletion ? (
                <DropdownMenuItem asChild>
                  <ArchiveNoteForm
                    noteId={note._id}
                    archiveStatus={note.markedAsArchived}
                  />
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem asChild>
                <DeleteNoteForm
                  noteId={note._id}
                  deletionStatus={note.markedForDeletion}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CardTitle className='line-clamp-1 pr-10'>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='line-clamp-2'>
            {note.content}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <p className='text-sm text-pretty'>
            Updated {moment(note.updatedAt).fromNow()}
          </p>
        </CardFooter>
      </Card>
    </EditNoteForm>
  );
}
