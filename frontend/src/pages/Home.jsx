import { useEffect } from "react";
import NoteDetails from "../components/NoteDetails";
import NoteForm from "../components/NoteForm";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { notes, dispatch } = useNoteContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_NOTES", payload: json });
        } else {
          throw new Error(json.error || "Failed to fetch");
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    if (user) {
      fetchNotes();
    }
  }, [dispatch, user]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        {/* LEFT: Notes */}
        <div className="flex flex-col space-y-4">
          {notes.map((note) => (
            <NoteDetails key={note._id} note={note} />
          ))}
        </div>

        {/* RIGHT: Form */}
        <div className="sticky top-24 self-start">
          <NoteForm />
        </div>
      </div>
    </main>
  );
};

export default Home;
