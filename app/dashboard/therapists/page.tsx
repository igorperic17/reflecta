"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  Activity,
  Search,
  Filter,
  Brain,
  Users,
  Star,
  Clock,
  DollarSign,
  Calendar,
  ChevronDown,
  X,
  Sparkles,
  CheckCircle2,
  Info
} from "lucide-react";
import { PrimaryButton, OutlineButton, SecondaryButton } from "@/components/dashboard/DashboardButton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/dashboard/UserAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { therapyTypes, getTherapyTypeName } from "@/lib/therapy-types";

// Define therapist type
interface Therapist {
  id: string;
  name: string;
  type: "human" | "ai";
  specialties: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  pricePerSession: number;
  availability: string[];
  imageUrl?: string;
}

export default function TherapistsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "human" | "ai">("all");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Purchase session state
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Sample therapist data
  const therapists: Therapist[] = [
    {
      id: "t1",
      name: "Dr. Sarah Johnson",
      type: "human",
      specialties: ["cbt", "anxiety", "depression"],
      bio: "Licensed clinical psychologist with 10+ years of experience specializing in cognitive behavioral therapy for anxiety and depression.",
      rating: 4.9,
      reviewCount: 124,
      pricePerSession: 120,
      availability: ["Monday", "Wednesday", "Friday"]
    },
    {
      id: "t2",
      name: "Michael Chen, LMFT",
      type: "human",
      specialties: ["relationships", "trauma", "psychodynamic"],
      bio: "Marriage and family therapist focusing on relationship issues and trauma recovery using psychodynamic approaches.",
      rating: 4.7,
      reviewCount: 89,
      pricePerSession: 110,
      availability: ["Tuesday", "Thursday", "Saturday"]
    },
    {
      id: "t3",
      name: "ReflectaAI Companion",
      type: "ai",
      specialties: ["cbt", "mindfulness", "stress"],
      bio: "Advanced AI therapist trained in cognitive behavioral techniques and mindfulness practices for stress management and daily mental wellness.",
      rating: 4.5,
      reviewCount: 213,
      pricePerSession: 45,
      availability: ["24/7 Availability"]
    },
    {
      id: "t4",
      name: "EmpatheticAI Guide",
      type: "ai",
      specialties: ["anxiety", "self-esteem", "humanistic"],
      bio: "AI therapist specializing in humanistic approaches to anxiety and self-esteem issues, providing empathetic and personalized guidance.",
      rating: 4.6,
      reviewCount: 178,
      pricePerSession: 40,
      availability: ["24/7 Availability"]
    },
    {
      id: "t5",
      name: "Dr. Jessica Williams",
      type: "human",
      specialties: ["grief", "trauma", "integrative"],
      bio: "Clinical psychologist with expertise in grief counseling and trauma recovery using an integrative therapeutic approach.",
      rating: 4.8,
      reviewCount: 102,
      pricePerSession: 130,
      availability: ["Monday", "Tuesday", "Thursday"]
    },
    {
      id: "t6",
      name: "TherapyMindAI",
      type: "ai",
      specialties: ["cbt", "depression", "self-esteem"],
      bio: "AI therapist designed to provide evidence-based cognitive behavioral therapy for depression and self-esteem issues.",
      rating: 4.4,
      reviewCount: 156,
      pricePerSession: 35,
      availability: ["24/7 Availability"]
    }
  ];

  // Filter therapists based on search and filters
  const filteredTherapists = therapists.filter(therapist => {
    // Filter by search query
    if (searchQuery && !therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !therapist.bio.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !therapist.specialties.some(s => getTherapyTypeName(s).toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by therapist type
    if (selectedType !== "all" && therapist.type !== selectedType) {
      return false;
    }
    
    // Filter by specialties
    if (selectedSpecialties.length > 0 && 
        !selectedSpecialties.some(specialty => therapist.specialties.includes(specialty))) {
      return false;
    }
    
    // Filter by price range
    if (therapist.pricePerSession < priceRange[0] || therapist.pricePerSession > priceRange[1]) {
      return false;
    }
    
    return true;
  });

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(s => s !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };

  const resetFilters = () => {
    setSelectedType("all");
    setSelectedSpecialties([]);
    setPriceRange([0, 200]);
    setSearchQuery("");
  };

  const handlePurchaseSessions = (therapist: Therapist) => {
    // Ensure patients can only book sessions for themselves
    if (user?.role === 'patient') {
      // For patients, we'll allow them to book both AI and human therapists
      // but we'll make it clear they're booking for themselves
      setSelectedTherapist(therapist);
      setShowPurchaseDialog(true);
      setPaymentComplete(false);
    } else {
      // For therapists and admins, proceed as normal
      setSelectedTherapist(therapist);
      setShowPurchaseDialog(true);
      setPaymentComplete(false);
    }
  };

  const processPayment = async () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would call your payment API here
    
    setIsProcessingPayment(false);
    setPaymentComplete(true);
    
    // Simulate sending a notification to the therapist
    // In a real app, this would be handled by your backend
  };

  const completePurchase = () => {
    setShowPurchaseDialog(false);
    
    // Navigate to the dashboard
    router.push("/dashboard");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Find Your Therapist</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Browse Therapists
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Find the perfect therapist for your mental health journey
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input 
              placeholder="Search therapists..." 
              className="pl-9 border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <OutlineButton className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </OutlineButton>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">Therapist Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      className={`cursor-pointer ${selectedType === "all" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}`}
                      onClick={() => setSelectedType("all")}
                    >
                      All Types
                    </Badge>
                    <Badge 
                      className={`cursor-pointer ${selectedType === "human" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}`}
                      onClick={() => setSelectedType("human")}
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Human
                    </Badge>
                    <Badge 
                      className={`cursor-pointer ${selectedType === "ai" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}`}
                      onClick={() => setSelectedType("ai")}
                    >
                      <Brain className="h-3 w-3 mr-1" />
                      AI
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {["cbt", "psychodynamic", "humanistic", "mindfulness", "integrative"].map(specialty => (
                      <Badge 
                        key={specialty}
                        className={`cursor-pointer ${selectedSpecialties.includes(specialty) ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}`}
                        onClick={() => handleSpecialtyChange(specialty)}
                      >
                        {getTherapyTypeName(specialty)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={200}
                      step={5}
                      onValueChange={(value: number[]) => setPriceRange(value as [number, number])}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 flex justify-end">
                  <OutlineButton onClick={resetFilters} size="sm">
                    <X className="h-3.5 w-3.5 mr-1" />
                    Reset
                  </OutlineButton>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Therapist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTherapists.map(therapist => (
          <Card key={therapist.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <UserAvatar 
                      name={therapist.name} 
                      role={therapist.type === "human" ? "therapist" : "admin"}
                      size="lg"
                      className="mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{therapist.name}</h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-amber-500 mr-1" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{therapist.rating}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">({therapist.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={therapist.type === "human" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"}>
                    {therapist.type === "human" ? (
                      <Users className="h-3 w-3 mr-1" />
                    ) : (
                      <Brain className="h-3 w-3 mr-1" />
                    )}
                    {therapist.type === "human" ? "Human" : "AI"}
                  </Badge>
                </div>
                
                <div className="mb-4 flex-1">
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {therapist.bio}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">SPECIALTIES</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {therapist.specialties.map(specialty => (
                      <Badge 
                        key={specialty}
                        className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 text-xs"
                      >
                        {getTherapyTypeName(specialty)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                    <span className="font-bold text-slate-900 dark:text-white">${therapist.pricePerSession}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">per session</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-1" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {therapist.type === "ai" ? "24/7 Availability" : "Multiple Slots"}
                    </span>
                  </div>
                </div>
                
                <PrimaryButton 
                  onClick={() => handlePurchaseSessions(therapist)}
                  className="w-full"
                >
                  Book Sessions
                </PrimaryButton>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredTherapists.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
            <Search className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No therapists found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-center mb-4">
              Try adjusting your filters or search query to find more therapists.
            </p>
            <OutlineButton onClick={resetFilters}>
              Reset Filters
            </OutlineButton>
          </div>
        )}
      </div>

      {/* Purchase Sessions Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {paymentComplete ? "Payment Successful" : "Book Sessions"}
            </DialogTitle>
            <DialogDescription>
              {paymentComplete 
                ? "Your sessions have been booked successfully." 
                : user?.role === 'patient'
                  ? `Book therapy sessions with ${selectedTherapist?.name} for yourself.`
                  : `Book therapy sessions with ${selectedTherapist?.name}`
              }
            </DialogDescription>
          </DialogHeader>
          
          {!paymentComplete ? (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center">
                  <UserAvatar 
                    name={selectedTherapist?.name || ""} 
                    role={selectedTherapist?.type === "human" ? "therapist" : "admin"}
                    size="md"
                    className="mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">{selectedTherapist?.name}</h3>
                    <Badge className={selectedTherapist?.type === "human" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"}>
                      {selectedTherapist?.type === "human" ? "Human" : "AI"}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 dark:text-white">${selectedTherapist?.pricePerSession}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">per session</div>
                </div>
              </div>
              
              {user?.role === 'patient' && (
                <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                  <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    As a patient, you're booking these sessions for your own therapy.
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="sessionCount">Number of Sessions</Label>
                <Select 
                  value={sessionCount.toString()} 
                  onValueChange={(value) => setSessionCount(parseInt(value))}
                >
                  <SelectTrigger id="sessionCount">
                    <SelectValue placeholder="Select number of sessions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Session</SelectItem>
                    <SelectItem value="3">3 Sessions (5% off)</SelectItem>
                    <SelectItem value="5">5 Sessions (10% off)</SelectItem>
                    <SelectItem value="10">10 Sessions (15% off)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedTherapist?.type === "human" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">Preferred Start Date</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">Preferred Time</Label>
                    <Select 
                      value={selectedTime} 
                      onValueChange={setSelectedTime}
                    >
                      <SelectTrigger id="preferredTime">
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                        <SelectItem value="evening">Evening (5pm - 9pm)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Price per session</span>
                  <span className="font-medium text-slate-900 dark:text-white">${selectedTherapist?.pricePerSession}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Number of sessions</span>
                  <span className="font-medium text-slate-900 dark:text-white">{sessionCount}</span>
                </div>
                
                {sessionCount > 1 && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>
                      {sessionCount >= 10 ? "15%" : sessionCount >= 5 ? "10%" : "5%"}
                    </span>
                  </div>
                )}
                
                <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900 dark:text-white">Total</span>
                    <span className="text-slate-900 dark:text-white">
                      ${calculateTotal(selectedTherapist?.pricePerSession || 0, sessionCount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Payment Successful
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 max-w-sm">
                {sessionCount} {sessionCount === 1 ? "session" : "sessions"} with {selectedTherapist?.name} have been booked successfully. You can view your upcoming sessions in your dashboard.
              </p>
            </div>
          )}
          
          <DialogFooter>
            {!paymentComplete ? (
              <>
                <OutlineButton onClick={() => setShowPurchaseDialog(false)}>
                  Cancel
                </OutlineButton>
                <PrimaryButton onClick={processPayment} disabled={isProcessingPayment}>
                  {isProcessingPayment ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${calculateTotal(selectedTherapist?.pricePerSession || 0, sessionCount)}`
                  )}
                </PrimaryButton>
              </>
            ) : (
              <PrimaryButton onClick={completePurchase} className="w-full">
                Go to Dashboard
              </PrimaryButton>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper function to calculate total price with discounts
function calculateTotal(pricePerSession: number, sessionCount: number): number {
  let discount = 0;
  
  if (sessionCount >= 10) {
    discount = 0.15; // 15% discount
  } else if (sessionCount >= 5) {
    discount = 0.10; // 10% discount
  } else if (sessionCount >= 3) {
    discount = 0.05; // 5% discount
  }
  
  const total = pricePerSession * sessionCount * (1 - discount);
  return Math.round(total);
} 