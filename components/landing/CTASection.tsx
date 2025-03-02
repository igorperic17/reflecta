import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ScrollFadeIn } from './AnimationWrapper';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-700 dark:via-indigo-600 dark:to-purple-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-10"></div>
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <ScrollFadeIn>
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Transform Your Mental Healthcare Practice Today
            </h2>
            <p className="mx-auto max-w-[700px] text-blue-50 md:text-xl">
              Join healthcare professionals who are enhancing patient outcomes and practice efficiency with Reflekta's AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ScrollFadeIn direction="up" delay={0.2}>
                <Link href="/auth/login">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-blue-50 hover:text-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </ScrollFadeIn>
              <ScrollFadeIn direction="up" delay={0.3}>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
                    Request a Demo
                  </Button>
                </Link>
              </ScrollFadeIn>
            </div>
            <ScrollFadeIn direction="up" delay={0.4}>
              <p className="text-sm text-blue-100">
                No commitment required. See how AI can enhance your mental healthcare practice.
              </p>
            </ScrollFadeIn>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}; 