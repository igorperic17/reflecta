"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { 
  Activity,
  Clock,
  Plus,
  Calendar,
  FileText,
  MessageSquare,
  ArrowLeft,
  Video,
  Brain,
  Info
} from "lucide-react";
import { PrimaryButton, OutlineButton, SecondaryButton } from "@/components/dashboard/DashboardButton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/dashboard/UserAvatar";
import { getTherapyTypeName } from "@/lib/therapy-types";
import { Session } from "@/lib/types";
import { toast } from "sonner";

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const patientId = params.id as string;
  
  // Redirect patients if they try to access another patient's page
  useEffect(() => {
    if (user?.role === "patient" && user?.id !== patientId) {
      // Redirect to their own dashboard
      router.push("/dashboard");
      toast.error("You can only view your own patient details");
    }
  }, [user, patientId, router]);

  // State for patient data
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // State for new session dialog
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false);
  const [newSessionDate, setNewSessionDate] = useState("");
  const [newSessionTime, setNewSessionTime] = useState("");
  const [newSessionType, setNewSessionType] = useState("Follow-up");
  const [newSessionTreatment, setNewSessionTreatment] = useState("cbt");
  const [newSessionIsAI, setNewSessionIsAI] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  // Sample patient data (in a real app, this would come from an API)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Sample data - in a real app, fetch this from your API
      const patientData = {
        id: patientId,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        status: "Active",
        lastSession: "Today, 10:30 AM",
        aiInteractions: 12,
        progress: "Improving",
        treatmentMethod: "cbt",
        age: 32,
        gender: "Female",
        phone: "(555) 123-4567",
        address: "123 Main St, Anytown, USA",
        emergencyContact: "John Doe (Husband) - (555) 987-6543",
        sessions: [
          {
            id: "s1",
            date: "Today",
            time: "10:30 AM",
            status: "Completed",
            type: "Follow-up",
            treatmentMethod: "cbt",
            isAISession: false
          },
          {
            id: "s2",
            date: "Last Week",
            time: "2:00 PM",
            status: "Completed",
            type: "Follow-up",
            treatmentMethod: "cbt",
            isAISession: true
          }
        ],
        notes: "Patient has been showing steady improvement with CBT techniques. Sleep patterns are normalizing and anxiety episodes have decreased in frequency."
      };
      
      setPatient(patientData);
      setLoading(false);
      setNewSessionTreatment(patientData.treatmentMethod);
    }, 500);
  }, [patientId]);

  const createNewSession = () => {
    setIsCreatingSession(true);
    
    // For patients, ensure they can only create AI sessions
    if (user?.role === "patient") {
      setNewSessionIsAI(true);
    }
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to create the session
      const newSession = {
        id: `new-${Date.now()}`,
        patientId: patient.id,
        patientName: patient.name,
        date: newSessionDate || "Tomorrow",
        time: newSessionTime || "10:00 AM",
        status: "Upcoming",
        type: newSessionType,
        notes: "",
        treatmentMethod: newSessionTreatment,
        isAISession: user?.role === "patient" ? true : newSessionIsAI
      };
      
      // Navigate to the new session
      router.push(`/dashboard/sessions/${newSession.id}`);
      
      setIsCreatingSession(false);
      setShowNewSessionDialog(false);
    }, 1000);
  };

  const goBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <OutlineButton onClick={goBack} size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </OutlineButton>
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
              <Activity className="w-4 h-4" />
              <span>Patient Details</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              {patient.name}
            </h1>
          </div>
        </div>
        
        {user?.role === "therapist" && (
          <PrimaryButton 
            icon={Plus} 
            size="default"
            onClick={() => setShowNewSessionDialog(true)}
          >
            Start New Session
          </PrimaryButton>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <UserAvatar 
                  name={patient.name} 
                  role="user"
                  size="xl"
                  className="mb-4"
                />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{patient.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{patient.email}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 capitalize">
                  {patient.status}
                </div>
                
                <div className="w-full mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Age:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{patient.age}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Gender:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{patient.gender}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Phone:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{patient.phone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Treatment:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{getTherapyTypeName(patient.treatmentMethod)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Last Session:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{patient.lastSession}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="sessions" className="space-y-6">
            <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
              <TabsTrigger value="sessions" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
                Sessions
              </TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
                Notes
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sessions">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Session History
                  </CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    View all therapy sessions for this patient
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.sessions.map((session: any) => (
                      <div 
                        key={session.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        onClick={() => router.push(`/dashboard/sessions/${session.id}`)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            {session.isAISession ? (
                              <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900 dark:text-white">{session.type}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{session.date}, {session.time}</p>
                          </div>
                        </div>
                        <Badge 
                          className={
                            session.status === "Completed" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Clinical Notes
                  </CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    Treatment progress and observations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                      {patient.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Documents
                  </CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    Patient documents and records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-40 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                    <p className="text-slate-500 dark:text-slate-400">No documents available</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* New Session Dialog */}
      <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {user?.role === "patient" ? "Start AI Therapy Session" : "Start New Session"}
            </DialogTitle>
            <DialogDescription>
              {user?.role === "patient" 
                ? "Start a new AI-assisted therapy session for yourself."
                : `Schedule a new therapy session for ${patient?.name}`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionDate">Date</Label>
                <Input
                  id="sessionDate"
                  placeholder="MM/DD/YYYY"
                  value={newSessionDate}
                  onChange={(e) => setNewSessionDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTime">Time</Label>
                <Input
                  id="sessionTime"
                  placeholder="HH:MM AM/PM"
                  value={newSessionTime}
                  onChange={(e) => setNewSessionTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessionType">Session Type</Label>
              <Select value={newSessionType} onValueChange={setNewSessionType}>
                <SelectTrigger id="sessionType">
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Initial Assessment">Initial Assessment</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Crisis Intervention">Crisis Intervention</SelectItem>
                  <SelectItem value="Group Therapy">Group Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="treatmentMethod">Treatment Method</Label>
              <Select value={newSessionTreatment} onValueChange={setNewSessionTreatment}>
                <SelectTrigger id="treatmentMethod">
                  <SelectValue placeholder="Select treatment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cbt">Cognitive Behavioral Therapy (CBT)</SelectItem>
                  <SelectItem value="psychodynamic">Psychodynamic Therapy</SelectItem>
                  <SelectItem value="humanistic">Humanistic Therapy</SelectItem>
                  <SelectItem value="integrative">Integrative Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Only show AI session toggle for therapists and admins, for patients it's always AI */}
            {user?.role !== "patient" && (
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="aiSession"
                  checked={newSessionIsAI}
                  onCheckedChange={setNewSessionIsAI}
                />
                <Label htmlFor="aiSession" className="cursor-pointer">AI-assisted session</Label>
              </div>
            )}
            
            {user?.role === "patient" && (
              <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  As a patient, you can start AI therapy sessions directly. For sessions with human therapists, please book through the Therapists page.
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <OutlineButton onClick={() => setShowNewSessionDialog(false)}>
              Cancel
            </OutlineButton>
            <PrimaryButton onClick={createNewSession} disabled={isCreatingSession}>
              {isCreatingSession ? (
                <>
                  <span className="animate-spin mr-2">
                    <Clock className="h-4 w-4" />
                  </span>
                  Creating...
                </>
              ) : (
                user?.role === "patient" ? "Start AI Session" : "Start Session"
              )}
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 