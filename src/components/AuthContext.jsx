import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const URL = import.meta.env.VITE_URL_IRONSACK;
  console.log(URL)
  const login = async (username, password) => {
    // Simulate fetching user data from a local JSON server

    const response = await fetch(
      `${URL}/users?logInName=${username}&password=${password}`
    );
    const users = await response.json();
    console.log(`Users:`, users)
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
