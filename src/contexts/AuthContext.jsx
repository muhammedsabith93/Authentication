
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, fetchUser } from "../services/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const id = localStorage.getItem("userId");

      if (id) {
        try {
          const data = await fetchUser(id);
          const { password, ...userInfo } = data;
          setUser(userInfo);
        } catch {
          localStorage.removeItem("userId");
        }
      }

      setIsLoading(false);
    };

    checkUser();
  }, []);


const login = async (data) => {
  const user = await loginUser(data);

  localStorage.setItem("userId", user.id);

  const { password, ...userInfo } = user;
  setUser(userInfo);

  return user;
};


  const register = (data) => registerUser(data);

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
