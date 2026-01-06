import { useState } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";
const NoteForm = () => {
  const { dispatch } = useNoteContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const note = { title, snippet, body };

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Something went wrong");
        setEmptyFields(json.emptyFields || []);
        return;
      }

      // success
      setTitle("");
      setSnippet("");
      setBody("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_NOTE", payload: json });
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Server error");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
      emptyFields.includes(field)
        ? "border border-red-400 focus:border-red-500"
        : "border border-gray-300 focus:border-gray-500"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h3 className="mb-4 text-base font-semibold text-gray-900">
        Add a new note
      </h3>

      {/* Title */}
      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass("title")}
        />
      </div>

      {/* Snippet */}
      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Snippet
        </label>
        <input
          type="text"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          className={inputClass("snippet")}
        />
      </div>

      {/* Body */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Body
        </label>
        <textarea
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={inputClass("body")}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
