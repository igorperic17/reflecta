"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  Activity,
  Clock,
  Plus,
  Search,
  X,
  Mic,
  MicOff,
  Video,
  Download,
  Filter,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Play,
  ListFilter,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon
} from "lucide-react";
import { PrimaryButton, OutlineButton, SecondaryButton } from "@/components/dashboard/DashboardButton";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO, isToday, isTomorrow, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { getTherapyTypeName } from "@/lib/therapy-types";

export default function SessionsPage() {
  const { user } = useAuth();
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionReady, setTranscriptionReady] = useState(false);
  const [isLoadingTranscription, setIsLoadingTranscription] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string[]>([]);
  const [filterPatient, setFilterPatient] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [transcriptionEngine, setTranscriptionEngine] = useState<any>(null);
  const [isDownloadingModel, setIsDownloadingModel] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [datePickerMonth, setDatePickerMonth] = useState<Date>(new Date());
  
  // Sample sessions data
  const sessions = [
    {
      id: "1",
      patientId: "p1",
      patientName: "Jane Doe",
      date: "Today",
      time: "10:30 AM - 11:30 AM",
      status: "Upcoming",
      type: "Video Call",
      notes: "Follow-up on anxiety management techniques",
      actualDate: new Date(),
      treatmentMethod: "cbt"
    },
    {
      id: "2",
      patientId: "p2",
      patientName: "John Smith",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      status: "Upcoming",
      type: "In-Person",
      notes: "Initial assessment",
      actualDate: new Date(),
      treatmentMethod: "mindfulness"
    },
    {
      id: "3",
      patientId: "p3",
      patientName: "Emily Johnson",
      date: "Yesterday",
      time: "11:00 AM - 12:00 PM",
      status: "Completed",
      type: "Video Call",
      notes: "Discussed progress with depression management",
      actualDate: addDays(new Date(), -1),
      treatmentMethod: "interpersonal"
    },
    {
      id: "4",
      patientId: "p4",
      patientName: "Michael Brown",
      date: "Feb 28, 2024",
      time: "3:30 PM - 4:30 PM",
      status: "Completed",
      type: "In-Person",
      notes: "Cognitive behavioral therapy session",
      actualDate: new Date(2024, 1, 28),
      treatmentMethod: "cbt"
    },
    {
      id: "5",
      patientId: "p1",
      patientName: "Jane Doe",
      date: "Tomorrow",
      time: "9:00 AM - 10:00 AM",
      status: "Upcoming",
      type: "Video Call",
      notes: "Weekly check-in",
      actualDate: addDays(new Date(), 1),
      treatmentMethod: "cbt"
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
    if (filterPatient !== "all" && session.patientId !== filterPatient) return false;
    
    // Date range filtering
    if (dateRange?.from && dateRange?.to) {
      const sessionDate = new Date(session.date);
      if (sessionDate < dateRange.from || sessionDate > dateRange.to) return false;
    } else if (filterDate !== "all") {
      if (filterDate === "today" && session.date !== "Today") return false;
      if (filterDate === "tomorrow" && session.date !== "Tomorrow") return false;
      if (filterDate === "past" && (session.date === "Today" || session.date === "Tomorrow")) return false;
    }
    
    if (filterStatus !== "all" && session.status.toLowerCase() !== filterStatus) return false;
    return true;
  });

  // Simulate loading the transcription model
  const loadTranscriptionModel = () => {
    setIsLoadingTranscription(true);
    // Simulate loading delay
    setTimeout(() => {
      setTranscriptionReady(true);
      setIsLoadingTranscription(false);
    }, 3000);
  };

  // Simulate downloading the transcription model
  const downloadTranscriptionModel = async () => {
    setIsDownloadingModel(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDownloadProgress(i);
    }
    
    // Initialize transcription engine
    try {
      // In a real implementation, this would be where you initialize
      // a speech recognition engine like Whisper.js or use the Web Speech API
      const recognition = 'webkitSpeechRecognition' in window
        ? new (window as any).webkitSpeechRecognition()
        : null;
        
      setTranscriptionEngine(recognition);
      setTranscriptionReady(true);
    } catch (error) {
      console.error('Failed to initialize transcription:', error);
    }
    
    setIsDownloadingModel(false);
  };

  // Handle starting transcription
  const startTranscription = () => {
    if (!transcriptionEngine) return;
    
    transcriptionEngine.continuous = true;
    transcriptionEngine.interimResults = true;
    
    transcriptionEngine.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      
      setTranscribedText(prev => [
        ...prev,
        `${user?.role === 'therapist' ? 'Therapist' : 'Patient'}: ${transcript}`
      ]);
    };
    
    transcriptionEngine.start();
    setIsTranscribing(true);
  };

  // Handle stopping transcription
  const stopTranscription = () => {
    if (transcriptionEngine) {
      transcriptionEngine.stop();
    }
    setIsTranscribing(false);
  };

  // Toggle transcription with enhanced handling
  const toggleTranscription = () => {
    if (!transcriptionReady && !isLoadingTranscription) {
      downloadTranscriptionModel();
    } else if (transcriptionReady) {
      if (isTranscribing) {
        stopTranscription();
      } else {
        startTranscription();
      }
    }
  };

  // Handle session cancellation
  const handleCancelSession = () => {
    // In a real app, you would make an API call to cancel the session
    console.log(`Cancelling session ${selectedSession?.id} with reason: ${cancelReason}`);
    setShowCancelDialog(false);
    setCancelReason("");
    // Update UI to reflect cancellation
    // This would typically be handled by refetching data from the server
  };

  // Handle starting a session
  const startSession = (session: any) => {
    setSelectedSession(session);
    setShowSessionDialog(true);
  };

  // Get sessions for a specific day
  const getSessionsForDay = (day: Date) => {
    return sessions.filter(session => 
      isSameDay(session.actualDate, day)
    );
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
                  <div 
                    key={session.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      {session.type === "Video Call" ? (
                        <Video className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      ) : (
                        <CalendarIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      )}
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
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {session.notes}
                            </p>
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                              {getTherapyTypeName(session.treatmentMethod)}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            session.status === "Upcoming" 
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" 
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          }`}>
                            {session.status}
                          </div>
                          <div className="flex gap-2">
                            {session.status === "Upcoming" && (
                              <>
                                <OutlineButton 
                                  size="sm" 
                                  icon={X}
                                  onClick={() => {
                                    setSelectedSession(session);
                                    setShowCancelDialog(true);
                                  }}
                                >
                                  Cancel
                                </OutlineButton>
                                {session.date === "Today" && (
                                  <PrimaryButton 
                                    size="sm" 
                                    icon={Play}
                                    onClick={() => startSession(session)}
                                  >
                                    Start Session
                                  </PrimaryButton>
                                )}
                              </>
                            )}
                            {session.status === "Completed" && (
                              <OutlineButton size="sm" icon={Download}>
                                Notes
                              </OutlineButton>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  <div 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-9 w-9 p-0 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 cursor-pointer"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </div>
                  <div 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-9 w-9 p-0 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 cursor-pointer"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                {format(currentMonth, 'MMMM yyyy')}
              </CardDescription>
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
                          <div 
                            key={session.id}
                            className="text-xs p-1 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                            onClick={() => {
                              setSelectedSession(session);
                              if (session.status === "Upcoming" && session.date === "Today") {
                                startSession(session);
                              }
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${
                                session.status === "Upcoming" 
                                  ? "bg-blue-500 dark:bg-blue-400" 
                                  : "bg-green-500 dark:bg-green-400"
                              }`} />
                              <span className="font-medium truncate">{session.patientName}</span>
                            </div>
                            <div className="ml-3 text-slate-500 dark:text-slate-400 truncate">
                              {session.time.split(' - ')[0]} • {getTherapyTypeName(session.treatmentMethod).split('(')[0].trim()}
                            </div>
                          </div>
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
              onClick={handleCancelSession}
              disabled={!cancelReason.trim()}
            >
              Confirm Cancellation
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Active Session Dialog */}
      <Dialog open={showSessionDialog} onOpenChange={setShowSessionDialog}>
        <DialogContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-blue-200 dark:border-blue-800">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                    {selectedSession?.patientName.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-slate-900 dark:text-white">Session with {selectedSession?.patientName}</DialogTitle>
                  <div className="flex items-center gap-2">
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                      {selectedSession?.date}, {selectedSession?.time} • {selectedSession?.type}
                    </DialogDescription>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {selectedSession?.treatmentMethod ? getTherapyTypeName(selectedSession.treatmentMethod) : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="transcription" className="text-slate-700 dark:text-slate-300 text-sm">
                    Transcription
                  </Label>
                  <Switch 
                    id="transcription" 
                    checked={isTranscribing} 
                    onCheckedChange={toggleTranscription}
                    disabled={isLoadingTranscription || !transcriptionReady}
                  />
                </div>
                <Badge 
                  className={`${
                    isLoadingTranscription 
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" 
                      : transcriptionReady 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300"
                  }`}
                >
                  {isLoadingTranscription ? (
                    <div className="flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Loading Model...</span>
                    </div>
                  ) : transcriptionReady ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Transcription Ready</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span>Transcription Not Loaded</span>
                    </div>
                  )}
                </Badge>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto my-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
            {isTranscribing ? (
              <div className="space-y-4">
                {transcribedText.length > 0 ? (
                  transcribedText.map((text, index) => {
                    const [speaker, message] = text.split(': ');
                    return (
                      <div 
                        key={index} 
                        className={`flex ${speaker === 'Therapist' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            speaker === 'Therapist' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                              : 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-200'
                          }`}
                        >
                          <p className="text-xs font-medium mb-1">{speaker}</p>
                          <p>{message}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Mic className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-slate-600 dark:text-slate-300">Listening... Start speaking to see transcription.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MicOff className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-300">Transcription is turned off. Toggle the switch to enable.</p>
                  {!transcriptionReady && !isLoadingTranscription && (
                    <SecondaryButton 
                      className="mt-4" 
                      onClick={loadTranscriptionModel}
                    >
                      Load Transcription Model
                    </SecondaryButton>
                  )}
                </div>
              </div>
            )}
            {isDownloadingModel && (
              <div className="space-y-2">
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                  Downloading transcription model: {downloadProgress}%
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center gap-4">
              <Input 
                placeholder="Type notes here..." 
                className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <PrimaryButton>
                Save Notes
              </PrimaryButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}