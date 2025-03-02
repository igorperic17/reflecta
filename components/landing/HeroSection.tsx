import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MeditationSVG, BrainSVG, HeartSVG } from './Illustrations';
import { FloatingElement, FadeIn } from './AnimationWrapper';

interface HeroSectionProps {
  mounted: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ mounted }) => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-10 w-40 h-40 transform -rotate-12">
          {mounted && <FloatingElement delay={0.2}><MeditationSVG /></FloatingElement>}
        </div>
        <div className="absolute bottom-20 right-10 w-32 h-32">
          {mounted && <FloatingElement delay={0.5}><HeartSVG /></FloatingElement>}
        </div>
        <div className="absolute top-40 right-20 w-24 h-24 transform rotate-12">
          {mounted && <FloatingElement delay={0.8}><BrainSVG /></FloatingElement>}
        </div>
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <FadeIn>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
                Reflecta: Your Mindful AI Companion
              </h1>
            </FadeIn>
            <FadeIn direction="up">
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
                Nurturing mental wellbeing through compassionate AI-driven insights and mindful reflection.
              </p>
            </FadeIn>
          </div>
          <FadeIn direction="up" delay={0.3}>
            <div className="space-x-4">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300 border-0">
                  Begin Your Journey
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="border-teal-500 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-slate-800 transition-all duration-300">
                  Discover More
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}; 