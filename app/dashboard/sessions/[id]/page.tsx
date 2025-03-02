"use client";

import { useState, useEffect, useRef } from "react";
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
  Clock,
  Send,
  Brain,
  AlertCircle
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

// Message interface for chat
interface ChatMessage {
  id: string;
  text: string;
  sender: 'assistant' | 'user' | 'system';
  timestamp: Date;
}

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
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLLMLoaded, setIsLLMLoaded] = useState(false);
  const [isLLMLoading, setIsLLMLoading] = useState(false);
  const [llmLoadingProgress, setLLMLoadingProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  // Initialize LLM
  useEffect(() => {
    const initLLM = async () => {
      try {
        setIsLLMLoading(true);
        setLLMLoadingProgress(0);
        
        // Simulate loading progress
        for (let i = 0; i <= 100; i += 5) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setLLMLoadingProgress(i);
        }
        
        // In a real implementation, we would initialize the WebLLM model here
        // For now, we'll simulate it with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsLLMLoaded(true);
        setIsLLMLoading(false);
        
        // Add initial system message to chat
        setChatMessages([{
          id: generateUniqueId(),
          text: "AI Assistant is ready to help with this therapy session. The assistant will provide supportive responses based on the conversation.",
          sender: 'system',
          timestamp: new Date()
        }]);
        
      } catch (error) {
        console.error("Failed to initialize LLM:", error);
        setIsLLMLoading(false);
        setChatMessages([{
          id: generateUniqueId(),
          text: "Failed to load AI Assistant. Please try refreshing the page.",
          sender: 'system',
          timestamp: new Date()
        }]);
      }
    };
    
    if (session) {
      initLLM();
    }
    
    return () => {
      // Clean up LLM when component unmounts
    };
  }, [session]);

  // Generate unique ID for messages
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

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
        
        // Update transcribed text
        setTranscribedText((prev: string[]) => [
          ...prev,
          `${user?.role === 'therapist' ? 'Therapist' : 'Patient'}: ${transcript}`
        ]);
        
        // Update current message input with the transcribed text
        setCurrentMessage(transcript);
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

  // Generate a response based on therapy techniques
  const generateTherapyResponse = async (userMessage: string): Promise<string> => {
    // In a real implementation, this would use WebLLM to generate a response
    // For now, we'll simulate it with predefined responses
    
    const therapyMethod = session?.treatmentMethod || 'cbt';
    
    // Simple response templates based on therapy method
    const responses: Record<string, string[]> = {
      'cbt': [
        "I notice you're experiencing some challenging thoughts. Let's explore how these thoughts might be affecting your feelings and behaviors.",
        "That sounds difficult. Can you identify any patterns in your thinking that might be contributing to these feelings?",
        "I'm hearing that you're struggling with these thoughts. Let's work together to examine the evidence for and against them.",
        "Thank you for sharing that. How do these thoughts typically affect your daily activities?",
        "I understand this is challenging. Let's try to identify some alternative perspectives that might be helpful."
      ],
      'psychodynamic': [
        "I'm curious about how your past experiences might be influencing your current feelings.",
        "That's interesting. Do you notice any patterns in your relationships that might connect to your early experiences?",
        "I wonder if there are unconscious factors that might be contributing to these feelings.",
        "Thank you for sharing that. How do you think your childhood experiences might relate to this situation?",
        "I'm hearing some themes that might connect to earlier parts of your life. Would you like to explore that further?"
      ],
      'humanistic': [
        "I appreciate your openness. What would it look like to approach this situation with self-compassion?",
        "You're showing a lot of awareness. How would you like to grow through this experience?",
        "I hear you valuing authenticity. What would feel most genuine to you in this situation?",
        "Thank you for sharing your experience. What meaning do you find in these challenges?",
        "I'm struck by your resilience. What personal strengths can you draw on right now?"
      ]
    };
    
    // Default to CBT if the therapy method is not recognized
    const methodResponses = responses[therapyMethod] || responses['cbt'];
    
    // Select a random response from the appropriate therapy method
    const randomIndex = Math.floor(Math.random() * methodResponses.length);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return methodResponses[randomIndex];
  };

  // Send message to LLM
  const sendMessage = async () => {
    if (!currentMessage.trim() || isGenerating) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: generateUniqueId(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    
    // Generate response
    try {
      setIsGenerating(true);
      
      // Add placeholder for assistant message
      const assistantMessageId = generateUniqueId();
      setChatMessages(prev => [
        ...prev, 
        {
          id: assistantMessageId,
          text: "...",
          sender: 'assistant',
          timestamp: new Date()
        }
      ]);
      
      // Generate response
      const response = await generateTherapyResponse(currentMessage);
      
      // Update assistant message with response
      setChatMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, text: response.trim() } 
            : msg
        )
      );
      
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Add error message
      setChatMessages(prev => [
        ...prev, 
        {
          id: generateUniqueId(),
          text: "Sorry, I couldn't generate a response. Please try again.",
          sender: 'system',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle key press for sending message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
              
              <Badge 
                className={`${
                  isLLMLoading 
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" 
                    : isLLMLoaded 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300"
                }`}
              >
                {isLLMLoading ? (
                  <div className="flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Loading AI: {llmLoadingProgress}%</span>
                  </div>
                ) : isLLMLoaded ? (
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    <span>AI Assistant Ready</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>AI Not Loaded</span>
                  </div>
                )}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-white">AI-Assisted Chat</h3>
              
              <div className="flex flex-col h-[400px] bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700">
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                  {chatMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${
                        message.sender === 'assistant' 
                          ? 'justify-start' 
                          : message.sender === 'user' 
                            ? 'justify-end' 
                            : 'justify-center'
                      }`}
                    >
                      {message.sender === 'system' ? (
                        <div className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm p-2 rounded-md max-w-[90%] text-center">
                          {message.text}
                        </div>
                      ) : (
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'assistant' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}
                        >
                          <p className="text-xs font-medium mb-1">
                            {message.sender === 'assistant' ? 'AI Assistant' : 'You'}
                          </p>
                          <p>{message.text}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isGenerating && chatMessages.length > 0 && chatMessages[chatMessages.length - 1].text === "..." && (
                    <div className="flex justify-start">
                      <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 p-3 rounded-lg max-w-[80%]">
                        <p className="text-xs font-medium mb-1">AI Assistant</p>
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={isTranscribing ? "Speak or type your message..." : "Type your message..."}
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      disabled={!isLLMLoaded || isGenerating}
                      className="flex-1"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!isLLMLoaded || isGenerating || !currentMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {isTranscribing && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Mic className="h-4 w-4 text-red-500 animate-pulse" />
                      <span>Listening...</span>
                    </div>
                  )}
                </div>
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