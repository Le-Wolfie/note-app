"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { deleteNoteAction } from "../_actions/note.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  noteId: string;
  deletionStatus: boolean;
};

const deleteNoteFormSchema = z.object({
  noteId: z.string(),
});

export type DeleteNoteFormValues = z.infer<typeof deleteNoteFormSchema>;

const DeleteNoteForm = ({ noteId, deletionStatus }: Props) => {
  const router = useRouter();
  const form = useForm<DeleteNoteFormValues>({
    resolver: zodResolver(deleteNoteFormSchema),
    defaultValues: {
      noteId: noteId,
    },
  });

  const onSubmit = async (values: DeleteNoteFormValues) => {
    const response = await deleteNoteAction(values);
    if (response.success) {
      toast.success(`Note has been ${deletionStatus ? "restored" : "trashed"}`);
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
          {deletionStatus ? "Restore" : "Trash"}
        </Button>
      </form>
    </Form>
  );
};

export default DeleteNoteForm;
