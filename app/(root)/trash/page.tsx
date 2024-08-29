import Notes from "../notes/_components/Note";
import { getNotes } from "../notes/_actions/note.actions";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  if (searchParams.q === null || searchParams.q === undefined) {
    searchParams.q = "";
  }
  const { notes } = await getNotes();
  const filteredNotes =
    notes.length > 0
      ? notes.filter(
          (note: any) =>
            (note.title.includes(searchParams.q) ||
              note.content.includes(searchParams.q)) &&
            note.markedForDeletion
        )
      : [];
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-pretty text-xl font-bold'>
          Notes in the trash are permanently deleted after a week.
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4'>
          {filteredNotes.length > 0
            ? filteredNotes.map((note: any) => (
                <Notes key={note._id} note={note} />
              ))
            : searchParams.q === ""
            ? "You have no notes in the trash."
            : "No notes found in the trash."}
        </div>
      </div>
    </>
  );
}
