"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  name: string;
  email: string;
  role: "admin" | "therapist" | "patient";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    // Safely check for localStorage availability
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("reflecta-user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
          localStorage.removeItem("reflecta-user");
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Hardcoded authentication for demo purposes
    if (email === "admin" && password === "admin") {
      const user = {
        name: "Dr. Admin Smith",
        email: "admin@reflecta.com",
        role: "admin" as const,
      };
      setUser(user);
      if (typeof window !== "undefined") {
        localStorage.setItem("reflecta-user", JSON.stringify(user));
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("reflecta-user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 