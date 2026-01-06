import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const API_BASE = import.meta.env.VITE_API_URL;

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      // Save JWT to localstorage or  persist user
      localStorage.setItem("user", JSON.stringify(json));

      // update global auth state or AuthContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
