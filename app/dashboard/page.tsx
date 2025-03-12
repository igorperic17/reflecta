"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import AdminDashboard from "./admin-dashboard";
import TherapistDashboard from "./therapist-dashboard";
import PatientDashboard from "./patient-dashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Render different dashboard based on user role
  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "therapist":
      return <TherapistDashboard />;
    case "patient":
      return <PatientDashboard />;
    default:
      return <PatientDashboard />;
  }
} 