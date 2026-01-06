import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-lg font-semibold text-gray-900">NotesWala</h1>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-700">{user.email}</span>
              <button
                onClick={handleClick}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-sm text-blue-600 hover:underline"
              >
                Signup
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
