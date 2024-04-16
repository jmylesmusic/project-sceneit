import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const URL = import.meta.env.VITE_URL_IRONSACK;
  const navigate = useNavigate(); // Initialize useNavigate

  const login = async (username, password) => {
    // Simulate fetching user data from a local JSON server

    const response = await fetch(
      `${URL}/users?logInName=${username}&password=${password}`
    );
    const users = await response.json();
    if (users.length > 0) {
      setUser({
        userId: users[0].userId,
        isLogged: true,
      });
    } else {
      alert("Invalid User Name / Password");
    }
  };

  const logout = () => {
    setUser(null); // User is logged out and user data is cleared
    navigate("/"); // Redirect to home ("/") page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
