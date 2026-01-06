import { useReducer } from "react";
import { NotesContext } from "./NotesContext";

const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return { notes: action.payload };
    case "CREATE_NOTE":
      return { notes: [action.payload, ...state.notes] };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    default:
      return state;
  }
};

const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, { notes: [] });

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
