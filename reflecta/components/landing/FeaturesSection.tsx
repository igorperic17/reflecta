"use client";

import { Card } from "@/components/ui/card";
import { Shield, Brain, Users, Sparkles } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.05),transparent_40%)]"></div>
      
      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 mb-2">
            Core Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400">
            Embracing Mindfulness with Technology
          </h2>
          <p className="mx-auto max-w-[800px] text-slate-600 md:text-xl dark:text-slate-300">
            Reflecta combines advanced AI with mindfulness principles to enhance your mental wellbeing journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <Card className="relative bg-white dark:bg-slate-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Privacy-First Approach</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Your mental health journey is personal. We ensure all data is encrypted and secure, respecting your privacy at every step.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                    End-to-end encryption
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                    Secure data storage
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                    User-controlled sharing
                  </li>
                </ul>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-teal-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Card>
          </div>
          
          <div className="group relative mt-8 md:mt-16">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <Card className="relative bg-white dark:bg-slate-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 mb-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">Mindful AI Insights</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Our specialized AI models track your progress and provide gentle guidance, helping you discover patterns and growth opportunities.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="mr-2 text-teal-600 dark:text-teal-400">•</span>
                    Personalized recommendations
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="mr-2 text-teal-600 dark:text-teal-400">•</span>
                    Progress tracking
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="mr-2 text-teal-600 dark:text-teal-400">•</span>
                    Adaptive learning
                  </li>
                </ul>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Card>
          </div>
          
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <Card className="relative bg-white dark:bg-slate-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">Human Connection</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Reflecta enhances the therapeutic relationship, creating a bridge between sessions and supporting your journey to wellbeing.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="mr-2 text-indigo-600 dark:text-indigo-400">•</span>
                    Therapist collaboration
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="mr-2 text-indigo-600 dark:text-indigo-400">•</span>
                    Community support
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="mr-2 text-indigo-600 dark:text-indigo-400">•</span>
                    Continuous care
                  </li>
                </ul>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Card>
          </div>
        </div>
        
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready to experience the difference?</h3>
                <p className="text-slate-600 dark:text-slate-300">Join thousands of users who have transformed their mental wellbeing journey.</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                4,600+ Active Users
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 