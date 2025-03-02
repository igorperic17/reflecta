import React from 'react';
import { MeditationSVG } from './Illustrations';

interface JourneyStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const JourneyStep: React.FC<JourneyStepProps> = ({ 
  number, 
  title, 
  description,
  isLast = false
}) => {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="flex-shrink-0 mt-1">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white group-hover:shadow-lg transition-all duration-300">
          {number}
        </div>
        {!isLast && (
          <div className="w-px h-full bg-gradient-to-b from-teal-500 to-blue-500 mx-auto mt-2 opacity-30"></div>
        )}
      </div>
      <div className="transform transition-all duration-300 group-hover:translate-x-1">
        <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mt-2">{description}</p>
      </div>
    </div>
  );
};

export const JourneySection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_10px_10px,rgba(0,0,0,0.1),transparent_15px)] bg-[length:20px_20px]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
            Your Mindfulness Journey
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
            A gentle, supportive experience for your mental wellbeing path.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <JourneyStep 
              number={1} 
              title="Mindful Reflection" 
              description="Engage in guided reflections and mindfulness practices whenever you need support."
            />
            
            <JourneyStep 
              number={2} 
              title="Compassionate Analysis" 
              description="Our AI gently analyzes patterns to help you understand your emotional journey."
            />
            
            <JourneyStep 
              number={3} 
              title="Growth & Healing" 
              description="Therapists receive organized insights to enhance your personal growth and healing journey."
              isLast
            />
          </div>
          
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-400/20 group-hover:from-teal-400/30 group-hover:to-blue-400/30 transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 relative animate-pulse-slow">
                <MeditationSVG />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent dark:from-slate-900/80 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 text-center">Interactive Mindfulness Experience</h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mt-2">Visualize your progress and growth through our calming interface.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 