"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  Calendar, 
  Activity,
  Clock,
  Plus,
  Search
} from "lucide-react";
import { PrimaryButton } from "@/components/dashboard/DashboardButton";
import { Input } from "@/components/ui/input";

export default function SessionsPage() {
  const { user } = useAuth();
  
  // Sample sessions data
  const sessions = [
    {
      id: "1",
      patientName: "Jane Doe",
      date: "Today",
      time: "10:30 AM - 11:30 AM",
      status: "Upcoming",
      type: "Video Call"
    },
    {
      id: "2",
      patientName: "John Smith",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      status: "Upcoming",
      type: "In-Person"
    },
    {
      id: "3",
      patientName: "Emily Johnson",
      date: "Yesterday",
      time: "11:00 AM - 12:00 PM",
      status: "Completed",
      type: "Video Call"
    },
    {
      id: "4",
      patientName: "Michael Brown",
      date: "Feb 28, 2024",
      time: "3:30 PM - 4:30 PM",
      status: "Completed",
      type: "In-Person"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Session Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Sessions
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {user?.role === "patient" 
              ? "View and manage your therapy sessions" 
              : "Schedule and manage therapy sessions with your patients"}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input placeholder="Search sessions..." className="pl-9 border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400" />
          </div>
          {user?.role !== "patient" && (
            <PrimaryButton icon={Plus}>
              New Session
            </PrimaryButton>
          )}
        </div>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Upcoming & Recent Sessions</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            View and manage your scheduled therapy sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div 
                key={session.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                        Session with {session.patientName}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center mt-1">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {session.date}, {session.time} • {session.type}
                      </p>
                    </div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      session.status === "Upcoming" 
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" 
                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    }`}>
                      {session.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 