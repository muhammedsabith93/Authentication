
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  loginUser,
  registerUser,
  fetchUser,
} from "../services/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Remove password from frontend user state
  const safeUser = (data) => {
    const { password, ...userInfo } = data;
    return userInfo;
  };

  // Check login after page refresh
  useEffect(() => {
    async function checkLogin() {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const data = await fetchUser(userId);
          setUser(safeUser(data));
        } catch (error) {
          localStorage.removeItem("userId");
        }
      }

      setIsLoading(false);
    }

    checkLogin();
  }, []);

  // Login
  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem("userId", data.id);
    setUser(safeUser(data));

    return data;
  };

  // Register
  const register = async (userData) => {
    const data = await registerUser(userData);
    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
