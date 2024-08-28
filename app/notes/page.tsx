import CreateNoteForm from "./_components/CreateNoteForm";
import { backendAPI } from "@/api";
import { auth } from "@clerk/nextjs/server";
import moment from "moment";
import Notes from "./_components/Note";

async function getNotes() {
  const clerkUser = auth();
  const token = await clerkUser?.getToken();

  const response = await backendAPI.get(`/notes/${clerkUser?.userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
            ? notes.map((note: any) => (
                <Notes
                  key={note._id}
                  title={note.title}
                  description={note.content}
                  noteId={note._id}
                  footer={moment(note.updatedAt).fromNow()}
                />
              ))
            : "No notes found, create one!"}
        </div>
      </div>
    </>
  );
}
