"use server";
import { backendAPI } from "@/api";
import { revalidatePath } from "next/cache";
import { CreateNoteFormValues } from "../_components/CreateNoteForm";
import { auth } from "@clerk/nextjs/server";
import { EditNoteFormValues } from "../_components/EditNoteForm";
import { ArchiveNoteFormValues } from "../_components/ArchiveNoteForm";
import { DeleteNoteFormValues } from "../_components/DeleteNoteForm";

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

export const updateNoteAction = async (
  data: EditNoteFormValues,
  noteId: string
) => {
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

export const archiveNoteAction = async (data: ArchiveNoteFormValues) => {
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

  const response = await backendAPI.patch(
    `/notes/${data.noteId}`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
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

export const deleteNoteAction = async (data: DeleteNoteFormValues) => {
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

  const response = await backendAPI.delete(`/notes/${data.noteId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
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


export async function getNotes() {
  const clerkUser = auth();
  const token = await clerkUser?.getToken();

  const response = await backendAPI.get(`/notes/${clerkUser?.userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
