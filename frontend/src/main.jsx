import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import AuthContextProvider from "./context/AuthContextProvider.jsx";
import NotesContextProvider from "./context/NotesContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthContextProvider>
      <NotesContextProvider>
        <App />
      </NotesContextProvider>
    </AuthContextProvider>
  // {/* </StrictMode> */}
);
