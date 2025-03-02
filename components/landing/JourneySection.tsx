import React from 'react';
import { ArrowUpRight, LineChart, BrainCircuit, Lightbulb } from 'lucide-react';

interface JourneyStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

const JourneyStep: React.FC<JourneyStepProps> = ({ 
  number, 
  title, 
  description,
  icon,
  isLast = false
}) => {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="flex-shrink-0 mt-1">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white group-hover:shadow-lg transition-all duration-300">
          {number}
        </div>
        {!isLast && (
          <div className="w-px h-full bg-gradient-to-b from-blue-500 to-indigo-500 mx-auto mt-2 opacity-30"></div>
        )}
      </div>
      <div className="transform transition-all duration-300 group-hover:translate-x-1">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mr-2">{title}</h3>
          <div className="text-indigo-500 dark:text-indigo-400">
            {icon}
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
  );
};

export const JourneySection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_10px_10px,rgba(0,0,0,0.1),transparent_15px)] bg-[length:20px_20px]"></div>
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-2">
            <ArrowUpRight className="w-4 h-4" />
            <span>The Process</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Your Mental Healthcare Journey
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
            A structured, supportive experience for improved mental healthcare outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <JourneyStep 
              number={1} 
              title="Data-Driven Assessment" 
              description="Engage with AI-powered tools that help clinicians gather comprehensive information about your mental health needs."
              icon={<LineChart className="w-5 h-5" />}
            />
            
            <JourneyStep 
              number={2} 
              title="Intelligent Analysis" 
              description="Our AI analyzes patterns and provides clinicians with insights to help develop personalized treatment plans."
              icon={<BrainCircuit className="w-5 h-5" />}
            />
            
            <JourneyStep 
              number={3} 
              title="Enhanced Treatment" 
              description="Therapists leverage AI-generated insights to deliver more effective, personalized care throughout your treatment journey."
              icon={<Lightbulb className="w-5 h-5" />}
              isLast
            />
          </div>
          
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 group-hover:from-blue-400/20 group-hover:to-indigo-400/20 transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full p-8">
                <div className="w-full h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">R</div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Patient Progress</h3>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Improving</span>
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div className="h-24 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <svg className="w-full h-full p-4" viewBox="0 0 100 50">
                        <path d="M0,25 Q10,40 20,20 T40,15 T60,30 T80,5 T100,20" fill="none" stroke="url(#gradient)" strokeWidth="2" />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#6366F1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">87%</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Engagement</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">64%</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Improvement</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">12</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Sessions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 