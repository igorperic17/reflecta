"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { useAuth } from "@/lib/auth-context";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Brain, 
  Heart, 
  Users, 
  Clock,
  Sparkles
} from "lucide-react";

// Define the steps for the onboarding process
const STEPS = [
  "Welcome",
  "Goals",
  "Preferences",
  "Therapy Type",
  "Complete"
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateUserProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    goals: "",
    primaryConcern: "",
    preferredTherapistType: "both", // "human", "ai", or "both"
    preferredTherapyTypes: [] as string[],
    preferredTime: "",
    previousTherapy: false,
    previousTherapyExperience: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleTherapyType = (type: string) => {
    setFormData(prev => {
      const current = [...prev.preferredTherapyTypes];
      if (current.includes(type)) {
        return { ...prev, preferredTherapyTypes: current.filter(t => t !== type) };
      } else {
        return { ...prev, preferredTherapyTypes: [...current, type] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const completeOnboarding = async () => {
    setLoading(true);
    
    // In a real app, you would save this data to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user profile with onboarding data
      if (updateUserProfile) {
        await updateUserProfile({
          ...formData,
          onboardingCompleted: true
        });
      }
      
      // Navigate to therapist search page
      router.push("/dashboard/therapists");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setLoading(false);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome to Reflecta</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              We're glad you're here. Let's take a few minutes to understand your needs and preferences so we can match you with the right therapist.
            </p>
            <div className="pt-4">
              <PrimaryButton onClick={nextStep} className="w-full sm:w-auto">
                Let's Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        );
        
      case 1: // Goals
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Therapy Goals</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Understanding your goals helps us match you with the right therapist.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryConcern">What brings you to therapy today?</Label>
                <Select 
                  value={formData.primaryConcern} 
                  onValueChange={(value) => updateFormData("primaryConcern", value)}
                >
                  <SelectTrigger id="primaryConcern">
                    <SelectValue placeholder="Select your primary concern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="stress">Stress Management</SelectItem>
                    <SelectItem value="relationships">Relationship Issues</SelectItem>
                    <SelectItem value="trauma">Trauma or PTSD</SelectItem>
                    <SelectItem value="grief">Grief and Loss</SelectItem>
                    <SelectItem value="self-esteem">Self-esteem</SelectItem>
                    <SelectItem value="life-transitions">Life Transitions</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goals">What are your goals for therapy?</Label>
                <Textarea 
                  id="goals" 
                  placeholder="I hope to achieve..."
                  value={formData.goals}
                  onChange={(e) => updateFormData("goals", e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="previousTherapy" className="flex items-center space-x-2">
                  <Checkbox 
                    id="previousTherapy" 
                    checked={formData.previousTherapy}
                    onCheckedChange={(checked) => updateFormData("previousTherapy", checked)}
                  />
                  <span>I've been to therapy before</span>
                </Label>
                
                {formData.previousTherapy && (
                  <Textarea 
                    id="previousTherapyExperience" 
                    placeholder="Please share a bit about your previous therapy experience..."
                    value={formData.previousTherapyExperience}
                    onChange={(e) => updateFormData("previousTherapyExperience", e.target.value)}
                    className="min-h-[80px] mt-2"
                  />
                )}
              </div>
            </div>
          </div>
        );
        
      case 2: // Preferences
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Preferences</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Tell us about your preferences for therapy.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>What type of therapist would you prefer?</Label>
                <RadioGroup 
                  value={formData.preferredTherapistType}
                  onValueChange={(value) => updateFormData("preferredTherapistType", value)}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <RadioGroupItem value="human" id="therapist-human" />
                    <Label htmlFor="therapist-human" className="flex items-center cursor-pointer">
                      <Users className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      <div>
                        <span className="font-medium">Human Therapist</span>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Licensed professionals with expertise in various therapy methods
                        </p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <RadioGroupItem value="ai" id="therapist-ai" />
                    <Label htmlFor="therapist-ai" className="flex items-center cursor-pointer">
                      <Brain className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                      <div>
                        <span className="font-medium">AI Therapist</span>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Advanced AI systems trained on therapeutic techniques
                        </p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <RadioGroupItem value="both" id="therapist-both" />
                    <Label htmlFor="therapist-both" className="flex items-center cursor-pointer">
                      <Heart className="h-5 w-5 mr-2 text-pink-600 dark:text-pink-400" />
                      <div>
                        <span className="font-medium">Show me both options</span>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          I'd like to see both human and AI therapist options
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredTime">When do you prefer to have therapy sessions?</Label>
                <Select 
                  value={formData.preferredTime} 
                  onValueChange={(value) => updateFormData("preferredTime", value)}
                >
                  <SelectTrigger id="preferredTime">
                    <SelectValue placeholder="Select your preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                    <SelectItem value="evening">Evening (5pm - 9pm)</SelectItem>
                    <SelectItem value="weekend">Weekends</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 3: // Therapy Type
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Therapy Approaches</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Select the therapy approaches you're interested in (select all that apply).
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <Checkbox 
                  id="therapy-cbt" 
                  checked={formData.preferredTherapyTypes.includes("cbt")}
                  onCheckedChange={() => toggleTherapyType("cbt")}
                  className="mt-1"
                />
                <div>
                  <Label 
                    htmlFor="therapy-cbt"
                    className="text-slate-900 dark:text-white font-medium cursor-pointer"
                  >
                    Cognitive Behavioral Therapy (CBT)
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Focuses on identifying and changing negative thought patterns and behaviors
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <Checkbox 
                  id="therapy-psychodynamic" 
                  checked={formData.preferredTherapyTypes.includes("psychodynamic")}
                  onCheckedChange={() => toggleTherapyType("psychodynamic")}
                  className="mt-1"
                />
                <div>
                  <Label 
                    htmlFor="therapy-psychodynamic"
                    className="text-slate-900 dark:text-white font-medium cursor-pointer"
                  >
                    Psychodynamic Therapy
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Explores unconscious processes and how they influence current behavior
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <Checkbox 
                  id="therapy-humanistic" 
                  checked={formData.preferredTherapyTypes.includes("humanistic")}
                  onCheckedChange={() => toggleTherapyType("humanistic")}
                  className="mt-1"
                />
                <div>
                  <Label 
                    htmlFor="therapy-humanistic"
                    className="text-slate-900 dark:text-white font-medium cursor-pointer"
                  >
                    Humanistic Therapy
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Emphasizes personal growth, self-actualization, and reaching your full potential
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <Checkbox 
                  id="therapy-mindfulness" 
                  checked={formData.preferredTherapyTypes.includes("mindfulness")}
                  onCheckedChange={() => toggleTherapyType("mindfulness")}
                  className="mt-1"
                />
                <div>
                  <Label 
                    htmlFor="therapy-mindfulness"
                    className="text-slate-900 dark:text-white font-medium cursor-pointer"
                  >
                    Mindfulness-Based Therapy
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Incorporates meditation and awareness practices to reduce stress and anxiety
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <Checkbox 
                  id="therapy-integrative" 
                  checked={formData.preferredTherapyTypes.includes("integrative")}
                  onCheckedChange={() => toggleTherapyType("integrative")}
                  className="mt-1"
                />
                <div>
                  <Label 
                    htmlFor="therapy-integrative"
                    className="text-slate-900 dark:text-white font-medium cursor-pointer"
                  >
                    Integrative Therapy
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Combines different therapeutic approaches based on individual needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4: // Complete
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">You're All Set!</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Thank you for sharing your preferences. We'll use this information to help you find the right therapist for your needs.
            </p>
            <div className="pt-4">
              <PrimaryButton 
                onClick={completeOnboarding} 
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Find Therapists
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </PrimaryButton>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card className="border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                  Patient Onboarding
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-1">
                {STEPS.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-2 w-8 rounded-full ${
                      index === currentStep 
                        ? "bg-blue-500 dark:bg-blue-400" 
                        : index < currentStep 
                          ? "bg-green-500 dark:bg-green-400" 
                          : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-2 pb-6">
            {renderStep()}
          </CardContent>
          
          {currentStep > 0 && currentStep < STEPS.length - 1 && (
            <CardFooter className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
              <OutlineButton onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </OutlineButton>
              <PrimaryButton onClick={nextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </PrimaryButton>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
} 