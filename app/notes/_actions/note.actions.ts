"use server";
import { backendAPI } from "@/api";
import { revalidatePath } from "next/cache";
import { CreateNoteFormValues } from "../_components/CreateNoteForm";
import { auth } from "@clerk/nextjs/server";
import { EditNoteFormValues } from "../_components/EditNoteForm";

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


export const updateNoteAction = async (data: EditNoteFormValues, noteId : string) => {
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

  const response = await backendAPI.post(`/notes/${noteId}`, requestBody, {
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
