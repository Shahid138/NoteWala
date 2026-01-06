import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";

const API_BASE = import.meta.env.VITE_API_URL;
const NoteDetails = ({ note }) => {
  const { dispatch } = useNoteContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    
    const response = await fetch(`${API_BASE}/api/notes/${note._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: note._id });
    }
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h4 className="mb-1 text-base font-semibold text-green-600">
        {note.title}
      </h4>

      <p className="mb-2 text-sm text-gray-600">{note.snippet}</p>

      <p className="mb-3 text-sm text-gray-700">{note.body}</p>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {new Date(note.createdAt).toLocaleString()}
        </p>

        <button
          onClick={handleClick}
          className="text-xs font-medium text-red-500 hover:text-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteDetails;
