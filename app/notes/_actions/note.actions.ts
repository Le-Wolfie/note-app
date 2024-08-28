"use server";
import { backendAPI } from "@/api";
import { revalidatePath } from "next/cache";
import { CreateNoteFormValues } from "../_components/CreateNoteForm";
import { auth } from "@clerk/nextjs/server";

export const createNoteAction = async (data: CreateNoteFormValues) => {
  const clerkUser = auth();
  if (!clerkUser) {
    return {
      success: false,
      error: {
        message: "Not authenticated",
      },
    };
  }

  const token = await clerkUser.getToken();

  const requestBody = {
    ...data,
  };

  const response = await backendAPI.post(`/notes`, requestBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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
