"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { archiveNoteAction } from "../_actions/note.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";

type Props = {
  noteId: string;
  archiveStatus: boolean;
};

const archiveNoteFormSchema = z.object({
  noteId: z.string(),
});

export type ArchiveNoteFormValues = z.infer<typeof archiveNoteFormSchema>;

const ArchiveNoteForm = ({ noteId, archiveStatus }: Props) => {
  const router = useRouter();
  const form = useForm<ArchiveNoteFormValues>({
    resolver: zodResolver(archiveNoteFormSchema),
    defaultValues: {
      noteId: noteId,
    },
  });

  const onSubmit = async (values: ArchiveNoteFormValues) => {
    const response = await archiveNoteAction(values);
    if (response.success) {
      toast.success(
        `Note has been ${archiveStatus ? "unarchived" : "archived"}`
      );
      router.refresh();
    } else {
      toast.error(response.error?.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <Button
          size={"sm"}
          variant='ghost'
          disabled={form.formState.isSubmitting}
          type='submit'
          className='border-none w-full'
        >
          {archiveStatus ? "Unarchive" : "Archive"}
        </Button>
      </form>
    </Form>
  );
};

export default ArchiveNoteForm;
