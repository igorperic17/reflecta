// Session interface for therapy sessions
export interface Session {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  type: string;
  notes: string;
  treatmentMethod: string;
  isAISession: boolean; // Whether this is an AI-assisted session or in-person
}

// User roles
export type UserRole = "therapist" | "patient" | "admin";

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
} 