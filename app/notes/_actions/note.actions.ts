"use server";
import { backendAPI } from "@/api";
import { revalidatePath } from "next/cache";
import { CreateNoteFormValues } from "../_components/CreateNoteForm";
import { currentUser } from "@clerk/nextjs/server";

export const createNoteAction = async (data: CreateNoteFormValues) => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return {
      success: false,
      error: {
        message: "Not authenticated",
      },
    };
  }
  const requestBody = {
    ...data,
    clerkId: clerkUser.id,
  };

  const response = await backendAPI.post(`/notes`, requestBody);

  if (response.status !== 201) {
    return {
      success: false,
      error: {
        message: response.data.error.message,
      },
    };
  }

  revalidatePath("/");

  return { success: true };
};
