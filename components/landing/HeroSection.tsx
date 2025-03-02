"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BrainSVG } from './Illustrations';
import { FadeIn } from './AnimationWrapper';
import { ArrowRight, Sparkles, MessageSquare, Shield, Brain } from 'lucide-react';

interface HeroSectionProps {
  mounted: boolean;
}

export function HeroSection({ mounted }: HeroSectionProps) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.1),transparent_50%)]"></div>
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Transforming Mental Healthcare</span>
            </div>
            
            <div className="space-y-4">
              <FadeIn>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                  Reflekta: AI-Powered Mental Healthcare
                </h1>
              </FadeIn>
              <FadeIn direction="up">
                <p className="max-w-[600px] text-slate-600 md:text-xl dark:text-slate-300">
                  Enhancing therapeutic experiences through AI-driven insights and personalized support for both therapists and patients.
                </p>
              </FadeIn>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 border-0 w-full sm:w-auto">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-800 transition-all duration-300 w-full sm:w-auto">
                  Explore Features
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">T</div>
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium">P</div>
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 font-medium">C</div>
              </div>
              <span>Trusted by healthcare professionals worldwide</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30 dark:opacity-20 animate-pulse"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">R</div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Reflekta Assistant</h3>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Online</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg max-w-[80%]">
                    <p className="text-slate-700 dark:text-slate-300">How are you feeling today? I'm here to support your mental wellbeing journey.</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg max-w-[80%] ml-auto">
                    <p className="text-blue-700 dark:text-blue-300">I've been feeling a bit anxious about work lately.</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg max-w-[80%]">
                    <p className="text-slate-700 dark:text-slate-300">I understand. Let's explore some techniques that might help with work-related anxiety. Would you like to try a quick exercise?</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 flex items-center">
                    <input type="text" placeholder="Type your message..." className="bg-transparent border-0 focus:ring-0 flex-1 text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Send</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">98%</div>
            <p className="text-slate-600 dark:text-slate-400">User satisfaction</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">500+</div>
            <p className="text-slate-600 dark:text-slate-400">Healthcare providers</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
            <p className="text-slate-600 dark:text-slate-400">Support available</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">HIPAA</div>
            <p className="text-slate-600 dark:text-slate-400">Fully compliant</p>
          </div>
        </div>
      </div>
    </section>
  );
} 