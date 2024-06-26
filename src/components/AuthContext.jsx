import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userMovies, setUserMovies] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_URL_IRONSACK;
  const navigate = useNavigate(); // Initialize useNavigate

  const login = async (email, password) => {
    const response = await fetch(
      `${BACKEND_URL}/users?email=${email}&password=${password}`
    );
    const users = await response.json();
    if (users.length > 0) {
      // Set the complete user object, not just id and isLogged
      setUser(users[0]);
      setUserMovies(users[0].movies || []);
    } else {
      alert("Invalid User Name / Password");
    }
  };

  const updateUserMovies = async (newMovies) => {
    setUserMovies(newMovies); // Update local state

    try {
      const response = await fetch(`${BACKEND_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({movies: newMovies}),
      });

      if (!response.ok) {
        // Handle the error, possibly reverting the optimistic update
        throw new Error("Failed to update user movies on server.");
      }
    } catch (error) {
      console.error("Error updating user movies:", error);
      // Consider reverting the optimistic update if the server update fails
    }
  };

  const logout = () => {
    setUser(null);
    setUserMovies([]); // Clear user movies as well
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, userMovies, updateUserMovies }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
