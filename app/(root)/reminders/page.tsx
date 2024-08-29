import { getNotes } from "../notes/_actions/note.actions";
import Notes from "../notes/_components/Note";

export default async function Page() {
  const { notes } = await getNotes();
  // Display only the notes that are not archived or deleted and have a reminder value
  const filteredNotes =
    notes.length > 0
      ? notes.filter(
          (note: any) =>
            !note.markedAsArchived && !note.markedForDeletion && note.reminder
        )
      : [];
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4'>
          {filteredNotes.length > 0
            ? filteredNotes.map((note: any) => (
                <Notes key={note._id} note={note} />
              ))
            : "You have no reminders set."}
        </div>
      </div>
    </>
  );
}
