"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { ArrowRight, Shield, Brain, Users, Sparkles, Info } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Try one of the demo accounts listed below.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-900">
      {/* Left side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-700 dark:via-indigo-600 dark:to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-12 w-full">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-6">reflekta.ai</h1>
            <p className="text-xl text-blue-100 mb-8">AI-Powered Mental Healthcare Platform</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-blue-100">Advanced analytics and personalized recommendations to enhance your therapeutic practice.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
                <p className="text-blue-100">Enterprise-grade security ensuring all patient data is protected and compliant with regulations.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enhanced Patient Care</h3>
                <p className="text-blue-100">Tools to strengthen the therapeutic alliance and provide continuous support between sessions.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-medium">T</div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-medium">P</div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-medium">C</div>
              </div>
              <span className="text-blue-100">Trusted by healthcare professionals worldwide</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Welcome Back</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Sign in to reflekta.ai
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Enter your credentials to access your account
            </p>
          </div>
          
          <Card className="border-slate-200 dark:border-slate-700 shadow-lg">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                {error && (
                  <div className="p-3 text-sm bg-red-50 text-red-500 rounded-md dark:bg-red-900/20 dark:text-red-300">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email or Username</Label>
                  <Input 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter username" 
                    className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                
                <div className="p-3 bg-blue-50 text-blue-700 rounded-md dark:bg-blue-900/20 dark:text-blue-300 text-sm">
                  <div className="flex items-start">
                    <Info className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium mb-1">Demo Accounts:</p>
                      <ul className="list-disc list-inside space-y-1 pl-1">
                        <li><span className="font-medium">Admin:</span> username: admin, password: admin</li>
                        <li><span className="font-medium">Therapist:</span> username: therapist, password: therapist</li>
                        <li><span className="font-medium">Patient:</span> username: patient, password: patient</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 border-0" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="text-center text-sm text-slate-600 dark:text-slate-300">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                    Create an account
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
} 