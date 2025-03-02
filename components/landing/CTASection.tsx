import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-900 dark:to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-10"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Begin Your Mindfulness Journey Today
          </h2>
          <p className="mx-auto max-w-[700px] text-teal-50 md:text-xl">
            Join healthcare professionals and individuals who are discovering new paths to mental wellbeing with Reflecta.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 hover:text-teal-700 shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Free Trial
            </Button>
          </Link>
          <p className="text-sm text-teal-100">
            No commitment required. Experience the benefits of mindful AI support.
          </p>
        </div>
      </div>
    </section>
  );
}; 