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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Bell, CalendarIcon, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNoteAction } from "../_actions/note.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Toggle } from "@/components/ui/toggle";

type Props = {};

const createNoteFormSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  content: z.string(),
  reminder: z.date().optional(),
});

export type CreateNoteFormValues = z.infer<typeof createNoteFormSchema>;

const CreateNoteForm = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false); // might remove, seems slower
  const [isReminderEnabled, setIsReminderEnabled] = useState(false); // New state for toggle
  const form = useForm<CreateNoteFormValues>({
    resolver: zodResolver(createNoteFormSchema),
    defaultValues: {
      title: "",
      content: "",
      reminder: undefined,
    },
  });

  const onSubmit = async (values: CreateNoteFormValues) => {
    const response = await createNoteAction(values);
    if (response.success) {
      toast.success("Note created successfully");
      form.reset();
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size='icon' variant='outline' onClick={() => setOpen(true)}>
              <Plus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create a new note</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteForm;
