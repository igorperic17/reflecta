"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { 
  Users, 
  Activity, 
  Brain, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  UserPlus,
  ArrowUpRight,
  FileText,
  Clock,
  Eye,
  CheckCircle2,
  CalendarDays,
  Bot,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/dashboard/UserAvatar";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Sample session request data
const sessionRequests = [
  {
    id: "req1",
    patientId: "p1",
    patientName: "Alex Johnson",
    requestDate: "2023-06-10",
    preferredDate: "2023-06-15",
    preferredTime: "14:00",
    sessionType: "Follow-up",
    treatmentMethod: "Cognitive Behavioral Therapy (CBT)",
    notes: "I'd like to discuss my progress with the anxiety management techniques we've been working on.",
    status: "pending"
  },
  {
    id: "req2",
    patientId: "p2",
    patientName: "Sam Taylor",
    requestDate: "2023-06-09",
    preferredDate: "2023-06-14",
    preferredTime: "10:30",
    sessionType: "Crisis Intervention",
    treatmentMethod: "Mindfulness-Based Therapy",
    notes: "I've been experiencing increased panic attacks this week and need some additional support.",
    status: "pending"
  },
  {
    id: "req3",
    patientId: "p3",
    patientName: "Jamie Smith",
    requestDate: "2023-06-08",
    preferredDate: "2023-06-16",
    preferredTime: "16:00",
    sessionType: "Initial Assessment",
    treatmentMethod: "Psychodynamic Therapy",
    notes: "",
    status: "pending"
  }
];

export default function TherapistDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState(sessionRequests);

  // Handle approving a session request
  const handleApproveRequest = (requestId: string) => {
    // Update the request status locally
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId ? { ...req, status: "approved" } : req
      )
    );
    
    // Show success message
    toast.success("Session request approved. The patient has been notified.");
    
    // In a real app, you would make an API call to update the request status
  };
  
  // Handle declining a session request
  const handleDeclineRequest = (requestId: string) => {
    // Update the request status locally
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId ? { ...req, status: "declined" } : req
      )
    );
    
    // Show success message
    toast.success("Session request declined. The patient has been notified.");
    
    // In a real app, you would make an API call to update the request status
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Therapist Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Manage your patients and therapy sessions
          </p>
        </div>
        <div className="flex gap-2">
          <OutlineButton icon={Calendar} size="default" onClick={() => router.push("/dashboard/sessions")}>
            View Schedule
          </OutlineButton>
          <PrimaryButton icon={UserPlus} size="default" onClick={() => router.push("/dashboard/patients")}>
            New Patient
          </PrimaryButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">My Patients</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">24</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+2</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Upcoming Sessions</CardTitle>
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">8</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+3</span> this week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">AI Assisted Sessions</CardTitle>
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">42</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Earnings</CardTitle>
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">$4,320</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+8.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
          <TabsTrigger value="today" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Today's Schedule
          </TabsTrigger>
          <TabsTrigger value="patients" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Recent Patients
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Session Notes
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Session Requests
          </TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Today's Schedule</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Your upcoming therapy sessions for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Session with Jane Doe</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      10:30 AM - 11:30 AM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/sessions/1")}>
                    View Details
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">AI Session Review - John Smith</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      1:00 PM - 1:30 PM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/sessions/2")}>
                    View Details
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Session with Robert Johnson</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      3:00 PM - 4:00 PM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/sessions/3")}>
                    View Details
                  </OutlineButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patients" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Recent Patients</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Your recently active patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <UserAvatar name="Jane Doe" role="user" size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Jane Doe</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Last session: Today, 10:30 AM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/patients/p1")}>
                    View Profile
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <UserAvatar name="John Smith" role="user" size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">John Smith</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Last session: Yesterday, 2:00 PM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/patients/p2")}>
                    View Profile
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <UserAvatar name="Robert Johnson" role="user" size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Robert Johnson</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Last session: 2 days ago
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/patients/p3")}>
                    View Profile
                  </OutlineButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Recent Session Notes</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Your latest therapy session notes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Jane Doe - Session Notes</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Today, 10:30 AM
                      </p>
                    </div>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    View Notes
                  </OutlineButton>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">John Smith - Session Notes</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Yesterday, 2:00 PM
                      </p>
                    </div>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    View Notes
                  </OutlineButton>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Robert Johnson - Session Notes</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        2 days ago
                      </p>
                    </div>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    View Notes
                  </OutlineButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Requests</CardTitle>
              <CardDescription>
                Manage session requests from your patients.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requests.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  No session requests at this time.
                </div>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarFallback>{request.patientName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{request.patientName}</div>
                          <div className="text-sm text-muted-foreground">
                            Requested on {format(new Date(request.requestDate), "MMM d, yyyy")}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          request.status === "approved" ? "default" : 
                          request.status === "declined" ? "destructive" : 
                          "outline"
                        }
                      >
                        {request.status === "approved" ? "Approved" : 
                         request.status === "declined" ? "Declined" : 
                         "Pending"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Preferred Date:</span>{" "}
                        {format(new Date(request.preferredDate), "MMM d, yyyy")}
                      </div>
                      <div>
                        <span className="font-medium">Preferred Time:</span>{" "}
                        {format(new Date(`2000-01-01T${request.preferredTime}`), "h:mm a")}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Session Type:</span>{" "}
                        {request.sessionType}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Treatment Method:</span>{" "}
                        {request.treatmentMethod}
                      </div>
                      {request.notes && (
                        <div className="col-span-2">
                          <span className="font-medium">Notes:</span>{" "}
                          {request.notes}
                        </div>
                      )}
                    </div>
                    
                    {request.status === "pending" && (
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                        <Button 
                          variant="outline" 
                          className="text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    )}
                    
                    {request.status === "approved" && (
                      <div className="flex justify-end pt-2">
                        <Button onClick={() => router.push(`/dashboard/sessions/new-${request.id}`)}>
                          Start Session
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 