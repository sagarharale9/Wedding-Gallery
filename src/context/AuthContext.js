"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null); // Ensure it's initialized properly

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check local storage on load
  useEffect(() => {
    const storedAdmin = localStorage.getItem("isAdmin");
    if (storedAdmin === "true") {
      setIsAdmin(true);
    }
  }, []);

  // Admin login function
  const login = async (username, password) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    } else {
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
