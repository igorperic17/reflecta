"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  Activity,
  Clock,
  Plus,
  Search,
  X,
  Video,
  Download,
  Filter,
  ChevronDown,
  AlertCircle,
  Play,
  ListFilter,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Loader2
} from "lucide-react";
import { PrimaryButton, OutlineButton, SecondaryButton } from "@/components/dashboard/DashboardButton";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DateRange } from "react-day-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO, isToday, isTomorrow, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { getTherapyTypeName } from "@/lib/therapy-types";
import { Session } from "@/lib/types";

export default function SessionsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [filterPatient, setFilterPatient] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSessionType, setFilterSessionType] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [datePickerMonth, setDatePickerMonth] = useState<Date>(new Date());
  
  // Create new session dialog
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false);
  const [newSessionPatient, setNewSessionPatient] = useState("");
  const [newSessionDate, setNewSessionDate] = useState("");
  const [newSessionTime, setNewSessionTime] = useState("");
  const [newSessionType, setNewSessionType] = useState("Follow-up");
  const [newSessionTreatment, setNewSessionTreatment] = useState("cbt");
  const [newSessionIsAI, setNewSessionIsAI] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  // Sample data for sessions
  const sessions: Session[] = [
    {
      id: "1",
      patientId: "p1",
      patientName: "Alex Johnson",
      date: "Today",
      time: "10:00 AM",
      status: "Upcoming",
      type: "Initial Assessment",
      notes: "",
      treatmentMethod: "cbt",
      isAISession: true
    },
    {
      id: "2",
      patientId: "p2",
      patientName: "Sam Taylor",
      date: "Today",
      time: "2:30 PM",
      status: "Upcoming",
      type: "Follow-up",
      notes: "",
      treatmentMethod: "psychodynamic",
      isAISession: false
    },
    {
      id: "3",
      patientId: "p3",
      patientName: "Jamie Smith",
      date: "Tomorrow",
      time: "11:15 AM",
      status: "Upcoming",
      type: "Follow-up",
      notes: "",
      treatmentMethod: "humanistic",
      isAISession: true
    },
    {
      id: "4",
      patientId: "p4",
      patientName: "Riley Wilson",
      date: "Yesterday",
      time: "3:00 PM",
      status: "Completed",
      type: "Follow-up",
      notes: "Patient reported improved sleep patterns. Continuing with current treatment plan.",
      treatmentMethod: "cbt",
      isAISession: false
    }
  ];

  // Sample patients data
  const patients = [
    { id: "p1", name: "Jane Doe" },
    { id: "p2", name: "John Smith" },
    { id: "p3", name: "Emily Johnson" },
    { id: "p4", name: "Michael Brown" }
  ];

  // Filter sessions based on selected filters
  const filteredSessions = sessions.filter(session => {
    // Filter by patient
    if (filterPatient !== "all" && session.patientId !== filterPatient) {
      return false;
    }
    
    // Filter by date
    if (filterDate !== "all") {
      if (filterDate === "today" && session.date !== "Today") {
        return false;
      }
      if (filterDate === "tomorrow" && session.date !== "Tomorrow") {
        return false;
      }
      if (filterDate === "upcoming" && (session.date === "Today" || session.date === "Yesterday")) {
        return false;
      }
      if (filterDate === "past" && session.date !== "Yesterday") {
        return false;
      }
    }
    
    // Filter by status
    if (filterStatus !== "all" && session.status !== filterStatus) {
      return false;
    }
    
    // Filter by session type
    if (filterSessionType !== "all" && session.isAISession !== (filterSessionType === "AI")) {
      return false;
    }
    
    return true;
  });

  // Get sessions for a specific day
  const getSessionsForDay = (day: Date) => {
    // In a real app, you would compare with actual dates
    // For this example, we'll just use the string representation
    const dayStr = isToday(day) ? "Today" : 
                  isTomorrow(day) ? "Tomorrow" : 
                  format(day, "MMM d, yyyy");
    
    return sessions.filter(session => session.date === dayStr);
  };

  // Generate calendar days for the main calendar view
  const calendarDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  // Generate calendar days for the date picker in filters
  const getDatePickerDays = (month: Date) => {
    return eachDayOfInterval({
      start: startOfMonth(month),
      end: endOfMonth(month)
    });
  };

  const datePickerDays = getDatePickerDays(datePickerMonth);

  const SessionCard = ({ session }: { session: Session }) => {
    return (
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-800">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  {session.patientName.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">{session.patientName}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>{session.date}, {session.time}</span>
                  <span>•</span>
                  <span>{session.type}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                className={`
                  ${session.status === "Upcoming" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : ""}
                  ${session.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : ""}
                  ${session.status === "Cancelled" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" : ""}
                `}
              >
                {session.status}
              </Badge>
              
              <Badge className={`${
                session.isAISession 
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" 
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              }`}>
                {session.isAISession ? "AI" : "In-Person"}
              </Badge>
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                {getTherapyTypeName(session.treatmentMethod)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <OutlineButton 
                onClick={() => router.push(`/dashboard/sessions/${session.id}`)}
                className="text-sm px-3 py-1 h-auto"
              >
                View Details
              </OutlineButton>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Simpler card for calendar view
  const CalendarSessionCard = ({ session }: { session: Session }) => {
    return (
      <div 
        key={session.id}
        className="text-xs p-1 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between"
        onClick={() => router.push(`/dashboard/sessions/${session.id}`)}
      >
        <div className="flex items-center gap-1">
          <span className="font-medium">{session.time}</span>
          <span>•</span>
          <span>{session.patientName}</span>
        </div>
        <Badge className="text-[0.65rem] px-1 py-0 h-4" variant="outline">
          {session.isAISession ? "AI" : "In-Person"}
        </Badge>
      </div>
    );
  };

  // Create new session
  const createNewSession = () => {
    setIsCreatingSession(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would make an API call to create the session
      setIsCreatingSession(false);
      setShowNewSessionDialog(false);
      
      // Reset form
      setNewSessionPatient("");
      setNewSessionDate("");
      setNewSessionTime("");
      setNewSessionType("Follow-up");
      setNewSessionTreatment("cbt");
      setNewSessionIsAI(false);
    }, 1000);
  };

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
          {user?.role === "therapist" && (
            <PrimaryButton 
              icon={Plus} 
              onClick={() => setShowNewSessionDialog(true)}
            >
              New Session
            </PrimaryButton>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Filters
            </CardTitle>
            <OutlineButton size="sm" onClick={() => {
              setFilterPatient("all");
              setFilterDate("all");
              setFilterStatus("all");
              setFilterSessionType("all");
              setDateRange(undefined);
            }}>
              Reset Filters
            </OutlineButton>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientFilter" className="text-slate-700 dark:text-slate-300">Patient</Label>
              <Select value={filterPatient} onValueChange={setFilterPatient}>
                <SelectTrigger id="patientFilter" className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400">
                  <SelectValue placeholder="All Patients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>{patient.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateRange" className="text-slate-700 dark:text-slate-300">Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal"
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                      ) : (
                        dateRange.from.toLocaleDateString()
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                  <div className="p-3">
                    <div className="space-y-4">
                      <div className="flex justify-center pt-1 relative items-center">
                        <div className="text-sm font-medium">
                          {format(datePickerMonth, 'MMMM yyyy')}
                        </div>
                        <div className="space-x-1 flex items-center absolute right-1">
                          <div 
                            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-700"
                            onClick={() => setDatePickerMonth(new Date(datePickerMonth.getFullYear(), datePickerMonth.getMonth() - 1, 1))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </div>
                          <div 
                            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-700"
                            onClick={() => setDatePickerMonth(new Date(datePickerMonth.getFullYear(), datePickerMonth.getMonth() + 1, 1))}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                          <div key={day} className="text-center text-slate-500 text-xs font-normal">
                            {day}
                          </div>
                        ))}
                        {datePickerDays.map((day, i) => {
                          const isSelected = dateRange?.from && dateRange?.to && 
                            day >= dateRange.from && day <= dateRange.to;
                          const isRangeStart = dateRange?.from && isSameDay(day, dateRange.from);
                          const isRangeEnd = dateRange?.to && isSameDay(day, dateRange.to);
                          
                          return (
                            <div 
                              key={i}
                              className={`text-center cursor-pointer h-8 w-8 p-0 flex items-center justify-center rounded-md
                                ${isSelected ? 'bg-slate-100 dark:bg-slate-800' : ''}
                                ${isRangeStart || isRangeEnd ? 'bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900' : ''}
                                ${isToday(day) && !isSelected ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50' : ''}
                              `}
                              onClick={() => {
                                if (!dateRange?.from) {
                                  setDateRange({ from: day, to: undefined });
                                } else if (dateRange.from && !dateRange.to && day >= dateRange.from) {
                                  setDateRange({ from: dateRange.from, to: day });
                                } else {
                                  setDateRange({ from: day, to: undefined });
                                }
                              }}
                            >
                              {format(day, 'd')}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                    <div 
                      className="w-full h-9 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 text-sm font-medium text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                      onClick={() => setDateRange(undefined)}
                    >
                      Clear
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="statusFilter" className="text-slate-700 dark:text-slate-300">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="statusFilter" className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTypeFilter" className="text-slate-700 dark:text-slate-300">Session Type</Label>
              <Select value={filterSessionType} onValueChange={setFilterSessionType}>
                <SelectTrigger id="sessionTypeFilter" className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400">
                  <SelectValue placeholder="All Session Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Session Types</SelectItem>
                  <SelectItem value="AI">AI Sessions</SelectItem>
                  <SelectItem value="in-person">In-Person Sessions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle and Content */}
      <Tabs defaultValue="list" value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "calendar")}>
        <div className="flex justify-end mb-4">
          <TabsList className="bg-slate-100 dark:bg-slate-800">
            <TabsTrigger value="list">
              <ListFilter className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar View
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="list" className="relative z-0">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Sessions</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                {filteredSessions.length} sessions found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="relative z-0">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-900 dark:text-white">Calendar View</CardTitle>
                <div className="flex items-center gap-2">
                  <div 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-9 px-4 py-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 cursor-pointer"
                    onClick={() => setCurrentMonth(new Date())}
                  >
                    Today
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {format(currentMonth, 'MMMM yyyy')}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-sm font-medium text-slate-500 dark:text-slate-400 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => {
                  const daysSessions = getSessionsForDay(day);
                  return (
                    <div 
                      key={i} 
                      className={`min-h-[120px] p-2 border border-slate-200 dark:border-slate-700 rounded-md ${
                        isToday(day) 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                          : 'bg-white dark:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${
                          isToday(day) 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {format(day, 'd')}
                        </span>
                        {daysSessions.length > 0 && (
                          <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                            {daysSessions.length}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 overflow-y-auto max-h-[80px]">
                        {daysSessions.map((session) => (
                          <CalendarSessionCard key={session.id} session={session} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cancel Session Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-white">Cancel Session</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Please provide a reason for cancelling this session with {selectedSession?.patientName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cancelReason" className="text-slate-700 dark:text-slate-300">Reason for Cancellation</Label>
              <Select 
                value={cancelReason} 
                onValueChange={setCancelReason}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schedule_conflict">Schedule Conflict</SelectItem>
                  <SelectItem value="illness">Illness or Emergency</SelectItem>
                  <SelectItem value="technical_issues">Technical Issues</SelectItem>
                  <SelectItem value="rescheduling">Rescheduling Required</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {cancelReason === 'other' && (
                <Textarea 
                  placeholder="Please specify the reason..."
                  className="mt-2"
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              )}
            </div>
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <span>The patient will be notified of this cancellation.</span>
            </div>
          </div>
          <DialogFooter>
            <OutlineButton onClick={() => setShowCancelDialog(false)}>
              Back
            </OutlineButton>
            <PrimaryButton 
              onClick={() => {
                // In a real app, you would make an API call to cancel the session
                console.log(`Cancelling session ${selectedSession?.id} with reason: ${cancelReason}`);
                setShowCancelDialog(false);
                setCancelReason("");
                // Update UI to reflect cancellation
                // This would typically be handled by refetching data from the server
              }}
              disabled={!cancelReason.trim()}
            >
              Confirm Cancellation
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create New Session Dialog */}
      <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Session</DialogTitle>
            <DialogDescription>
              Schedule a new therapy session with a patient.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Select value={newSessionPatient} onValueChange={setNewSessionPatient}>
                <SelectTrigger id="patient">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p1">Alex Johnson</SelectItem>
                  <SelectItem value="p2">Sam Taylor</SelectItem>
                  <SelectItem value="p3">Jamie Smith</SelectItem>
                  <SelectItem value="p4">Riley Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={newSessionDate}
                  onChange={(e) => setNewSessionDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={newSessionTime}
                  onChange={(e) => setNewSessionTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Session Type</Label>
              <Select value={newSessionType} onValueChange={setNewSessionType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Initial Assessment">Initial Assessment</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Crisis Intervention">Crisis Intervention</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="treatment">Treatment Method</Label>
              <Select value={newSessionTreatment} onValueChange={setNewSessionTreatment}>
                <SelectTrigger id="treatment">
                  <SelectValue placeholder="Select treatment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cbt">Cognitive Behavioral Therapy (CBT)</SelectItem>
                  <SelectItem value="psychodynamic">Psychodynamic Therapy</SelectItem>
                  <SelectItem value="humanistic">Humanistic Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-session" 
                checked={newSessionIsAI} 
                onCheckedChange={setNewSessionIsAI}
              />
              <Label htmlFor="ai-session">AI-Assisted Session</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowNewSessionDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={createNewSession}
              disabled={!newSessionPatient || !newSessionDate || !newSessionTime || isCreatingSession}
            >
              {isCreatingSession ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Session"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}