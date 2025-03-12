"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "user" | "therapist" | "admin" | "patient";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  specialties?: string[];
  profileCompleted?: boolean;
};

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUserProfile?: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
  updateUserSpecialties: (specialties: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check with your backend
        // For now, we'll just check localStorage
        const storedUser = localStorage.getItem("user");
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would validate with your backend
      // For demo purposes, we'll use mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let mockUser: User;
      
      // Mock different user roles based on email
      if (email.includes("therapist")) {
        mockUser = {
          id: "t1",
          name: "Dr. Sarah Johnson",
          email,
          role: "therapist",
          specialties: ["cbt", "anxiety", "depression"],
          profileCompleted: true
        };
      } else if (email.includes("admin")) {
        mockUser = {
          id: "a1",
          name: "Admin User",
          email,
          role: "admin",
          profileCompleted: true
        };
      } else {
        mockUser = {
          id: "p1",
          name: "Alex Johnson",
          email,
          role: "patient",
          profileCompleted: false
        };
      }
      
      // Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would register with your backend
      // For demo purposes, we'll use mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: `${role[0]}${Math.floor(Math.random() * 1000)}`,
        name,
        email,
        role,
        profileCompleted: false
      };
      
      // Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUserSpecialties = (specialties: string[]) => {
    if (user) {
      const updatedUser = {
        ...user,
        specialties
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (user) {
      // In a real app, you would update with your backend
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        ...data
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    updateUserSpecialties,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 