import { getNotes } from "./_actions/note.actions";
import CreateNoteForm from "./_components/CreateNoteForm";
import Notes from "./_components/Note";

export default async function Page() {
  const { notes } = await getNotes();
  // Display only the notes that are not archived or deleted
  const filteredNotes =
    notes.length > 0
      ? notes.filter(
          (note: any) => !note.markedAsArchived && !note.markedForDeletion
        )
      : [];
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <CreateNoteForm />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4'>
          {filteredNotes.length > 0
            ? filteredNotes.map((note: any) => (
                <Notes key={note._id} note={note} />
              ))
            : "No notes found, create one!"}
        </div>
      </div>
    </>
  );
}
