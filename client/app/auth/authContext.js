"use client";
import { createContext, useState, useEffect, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    const url = "http://localhost:4000/api/auth/status";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      const data = await response.json();
      setIsLogged(true);
      setUsername(data.username.username);
      setName(data.username.name);
    } else {
      setIsLogged(false);
      setUsername("");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="h-screen flex items-center justify-center">
          <CircularProgress sx={{ color: "#FF7F50" }} />
        </div>
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ isLogged, name, username, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
