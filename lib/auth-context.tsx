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
      const storedUser = localStorage.getItem("reflekta-user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
          localStorage.removeItem("reflekta-user");
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
        email: "admin@reflekta.ai",
        role: "admin" as const,
      };
      setUser(user);
      if (typeof window !== "undefined") {
        localStorage.setItem("reflekta-user", JSON.stringify(user));
      }
      return true;
    } else if (email === "therapist" && password === "therapist") {
      const user = {
        name: "Dr. Jane Wilson",
        email: "jane.wilson@reflekta.ai",
        role: "therapist" as const,
      };
      setUser(user);
      if (typeof window !== "undefined") {
        localStorage.setItem("reflekta-user", JSON.stringify(user));
      }
      return true;
    } else if (email === "patient" && password === "patient") {
      const user = {
        name: "Michael Johnson",
        email: "michael.johnson@gmail.com",
        role: "patient" as const,
      };
      setUser(user);
      if (typeof window !== "undefined") {
        localStorage.setItem("reflekta-user", JSON.stringify(user));
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("reflekta-user");
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