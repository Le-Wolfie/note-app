import { getNotes } from "./_actions/note.actions";
import CreateNoteForm from "./_components/CreateNoteForm";
import Notes from "./_components/Note";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  const { notes } = await getNotes();
  if (searchParams.q === null || searchParams.q === undefined) {
    searchParams.q = "";
  }

  // Display only the notes that match the query (if it exists) and not archived or deleted
  const filteredNotes =
    notes.length > 0
      ? notes.filter(
          (note: any) =>
            (note.title.includes(searchParams.q) ||
              note.content.includes(searchParams.q)) &&
            !note.markedAsArchived &&
            !note.markedForDeletion
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
            : searchParams.q === ""
            ? "No notes found, create one!"
            : "No notes found with that query"}
        </div>
      </div>
    </>
  );
}
