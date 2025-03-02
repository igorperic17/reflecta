"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  ArrowLeft,
  Mic,
  MicOff,
  Video,
  Download,
  Loader2,
  CheckCircle2,
  Save,
  Clock
} from "lucide-react";
import { PrimaryButton, OutlineButton, SecondaryButton } from "@/components/dashboard/DashboardButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTherapyTypeName } from "@/lib/therapy-types";
import { Session } from "@/lib/types";

export default function SessionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [session, setSession] = useState<Session | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionReady, setTranscriptionReady] = useState(false);
  const [isLoadingTranscription, setIsLoadingTranscription] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string[]>([]);
  const [transcriptionEngine, setTranscriptionEngine] = useState<any>(null);
  const [isDownloadingModel, setIsDownloadingModel] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch session data
  useEffect(() => {
    // In a real app, you would fetch this from an API
    const mockSessions: Session[] = [
      {
        id: "1",
        patientId: "p1",
        patientName: "Alex Johnson",
        date: "Today",
        time: "10:00 AM",
        status: "Upcoming",
        type: "Initial Assessment",
        notes: "",
        treatmentMethod: "cbt"
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
        treatmentMethod: "psychodynamic"
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
        treatmentMethod: "humanistic"
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
        treatmentMethod: "cbt"
      }
    ];

    const sessionId = params?.id as string;
    const foundSession = mockSessions.find(s => s.id === sessionId);
    
    if (foundSession) {
      setSession(foundSession);
      setNotes(foundSession.notes);
    } else {
      // Redirect to sessions page if session not found
      router.push("/dashboard/sessions");
    }
  }, [params, router]);

  // Request microphone access
  const requestMicrophoneAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (error) {
      console.error("Microphone access denied:", error);
      return false;
    }
  };

  // Initialize transcription engine
  const initializeTranscriptionEngine = async () => {
    setIsDownloadingModel(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setDownloadProgress(i);
    }
    
    // Check if browser supports Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Try Chrome or Edge.");
      setIsDownloadingModel(false);
      return;
    }
    
    // Initialize Web Speech API
    try {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        setTranscribedText((prev: string[]) => [
          ...prev,
          `${user?.role === 'therapist' ? 'Therapist' : 'Patient'}: ${transcript}`
        ]);
      };
      
      setTranscriptionEngine(recognition);
      setTranscriptionReady(true);
      setIsDownloadingModel(false);
    } catch (error) {
      console.error('Failed to initialize transcription:', error);
      setIsDownloadingModel(false);
    }
  };

  // Start transcription
  const startTranscription = async () => {
    if (!transcriptionEngine) return;
    
    const hasAccess = await requestMicrophoneAccess();
    if (!hasAccess) {
      alert("Microphone access is required for transcription.");
      return;
    }
    
    transcriptionEngine.start();
    setIsTranscribing(true);
  };

  // Stop transcription
  const stopTranscription = () => {
    if (transcriptionEngine) {
      transcriptionEngine.stop();
    }
    setIsTranscribing(false);
  };

  // Toggle transcription
  const toggleTranscription = async () => {
    if (!transcriptionReady) {
      await initializeTranscriptionEngine();
    } else {
      if (isTranscribing) {
        stopTranscription();
      } else {
        startTranscription();
      }
    }
  };

  // Save session notes
  const saveNotes = async () => {
    setIsSaving(true);
    
    // In a real app, you would make an API call to save the notes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the session object
    setSession((prev: Session | null) => {
      if (!prev) return null;
      return {
        ...prev,
        notes: notes
      };
    });
    
    setIsSaving(false);
  };

  // Go back to sessions page
  const goBack = () => {
    router.push("/dashboard/sessions");
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <OutlineButton icon={ArrowLeft} onClick={goBack}>
            Back to Sessions
          </OutlineButton>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Session with {session.patientName}
          </h1>
        </div>
        
        <Badge 
          className={
            session.status === "Completed" 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : session.status === "Cancelled" 
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
          }
        >
          {session.status}
        </Badge>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-blue-200 dark:border-blue-800">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  {session.patientName.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <CardTitle className="text-xl">{session.patientName}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>{session.date}, {session.time}</span>
                  <span>•</span>
                  <span>{session.type}</span>
                  <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                    {getTherapyTypeName(session.treatmentMethod)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="transcription" className="text-slate-700 dark:text-slate-300">
                  Transcription
                </Label>
                <Switch 
                  id="transcription" 
                  checked={isTranscribing} 
                  onCheckedChange={toggleTranscription}
                  disabled={isLoadingTranscription}
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
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-white">Transcription</h3>
              
              <div className="h-[400px] overflow-y-auto p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700">
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
                    </div>
                  </div>
                )}
                
                {isDownloadingModel && (
                  <div className="absolute bottom-4 left-4 right-4 space-y-2 bg-white dark:bg-slate-800 p-4 rounded-md shadow-md border border-slate-200 dark:border-slate-700">
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
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-white">Session Notes</h3>
              
              <Textarea 
                className="h-[400px] resize-none border-slate-200 dark:border-slate-700"
                placeholder="Enter your session notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              
              <div className="flex justify-end">
                <PrimaryButton 
                  icon={Save} 
                  onClick={saveNotes}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Notes'}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 