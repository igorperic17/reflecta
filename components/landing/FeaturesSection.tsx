import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  colorClass
}) => {
  return (
    <div className="group">
      <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 border-none shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        <CardHeader>
          <div className={`w-12 h-12 mb-4 rounded-full ${colorClass} flex items-center justify-center`}>
            {icon}
          </div>
          <CardTitle className="text-teal-700 dark:text-teal-300">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,197,253,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(147,197,253,0.05),transparent_40%)]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
            Embracing Mindfulness with Technology
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
            Reflecta combines advanced AI with mindfulness principles to enhance your mental wellbeing journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Privacy-First Approach"
            description="Your mental health journey is personal. We ensure all data is encrypted and secure, respecting your privacy at every step."
            colorClass="bg-blue-100 dark:bg-blue-900/30"
            icon={
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
          
          <FeatureCard
            title="Mindful AI Insights"
            description="Our specialized AI models track your progress and provide gentle guidance, helping you discover patterns and growth opportunities."
            colorClass="bg-teal-100 dark:bg-teal-900/30"
            icon={
              <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
          />
          
          <FeatureCard
            title="Human Connection"
            description="Reflecta enhances the therapeutic relationship, creating a bridge between sessions and supporting your journey to wellbeing."
            colorClass="bg-purple-100 dark:bg-purple-900/30"
            icon={
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}; 