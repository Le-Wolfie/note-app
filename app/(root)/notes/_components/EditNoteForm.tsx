"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateNoteAction } from "../_actions/note.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, CalendarIcon, PencilIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  title: string;
  content: string;
  noteId: string;
  labels: string[];
  reminder: Date;
  children: React.ReactNode;
};

const editNoteFormSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  content: z.string(),
  labels: z.string().optional(),
  reminder: z.date().optional(),
});

export type EditNoteFormValues = z.infer<typeof editNoteFormSchema>;

const EditNoteForm = ({
  title,
  content,
  noteId,
  reminder,
  labels,
  children,
}: Props) => {
  const [isReminderEnabled, setIsReminderEnabled] = useState(Boolean(reminder));
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<EditNoteFormValues>({
    resolver: zodResolver(editNoteFormSchema),
    defaultValues: {
      title: title,
      content: content,
      labels: labels.join(", "),
      reminder: reminder ? new Date(reminder) : undefined,
    },
  });

  const onSubmit = async (values: EditNoteFormValues) => {
    const response = await updateNoteAction(values, noteId);
    if (response.success) {
      toast.success("Note updated successfully");
      setOpen(false); // Close the dialog
      router.refresh();
    } else {
      toast.error(response.error?.message);
    }
  };

  const reminderDate = form.watch("reminder");

  // Handle toggle change
  const handleToggleChange = (isPressed: boolean) => {
    setIsReminderEnabled(isPressed);
    if (!isPressed) {
      // Clear the reminder date if the toggle is turned off
      form.setValue("reminder", undefined);
    }
  };

  const onInvalid = (errors: any) => console.error(errors);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Note</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='What is this about?' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='What do you want to write?'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='labels'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-2 mb-2'>
                    {labels.length > 0
                      ? labels.map((label) => {
                          return (
                            <span
                              key={label}
                              className='rounded-full bg-primary-foreground text-primary-background px-2 py-1'
                            >
                              {label}
                            </span>
                          );
                        })
                      : "No labels"}
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className='text-left font-normal'
                        >
                          <p className='flex gap-2 items-center'>
                            <PencilIcon /> Add labels
                          </p>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Input
                          placeholder='Add labels'
                          {...field}
                          className='w-full'
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='reminder'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center mb-2'>
                    <Toggle
                      className='ml-2'
                      pressed={isReminderEnabled}
                      onPressedChange={handleToggleChange}
                    >
                      <p className='flex gap-2 items-center text-pretty'>
                        <Bell /> Set as reminder
                      </p>
                    </Toggle>
                  </FormLabel>
                  <FormControl>
                    <div className={cn(isReminderEnabled ? "block" : "hidden")}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "text-left font-normal",
                              reminderDate
                                ? "text-secondary-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {reminderDate
                              ? format(new Date(reminderDate), "PPP")
                              : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                          <Calendar
                            mode='single'
                            selected={reminderDate}
                            onSelect={(date) => form.setValue("reminder", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={form.formState.isSubmitting} type='submit'>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteForm;
