"use client";

import { api } from "@/infra/api/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
  login(cpf: string, password: string): Promise<void>;
  logout(): Promise<void>;

  isAuthenticated: boolean;
  isLoading: boolean;
}

const context = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const TOKEN_KEY = "app-token";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (cpf: string, password: string) => {
    const response = await api.post("/login", { cpf, password });
    localStorage.setItem(TOKEN_KEY, response.data.token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <context.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useAuth() {
  return useContext(context);
}
