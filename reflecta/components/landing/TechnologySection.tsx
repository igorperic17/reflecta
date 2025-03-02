"use client";

import { Brain, Network, Database, UserCog } from "lucide-react";
import Image from "next/image";

export function TechnologySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.1),transparent_25%)] dark:bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.05),transparent_25%)]"></div>
      
      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 mb-2">
            Advanced Technology
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Cutting-Edge AI for Mental Healthcare
          </h2>
          <p className="mx-auto max-w-[800px] text-slate-600 md:text-xl dark:text-slate-300">
            Our platform leverages the latest advancements in artificial intelligence to enhance the therapeutic experience for both clinicians and patients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                <Image 
                  src="/tech-illustration.svg" 
                  alt="AI Technology Illustration" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-slate-700 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Large-Scale Neural Networks</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Our platform is built on state-of-the-art neural networks trained on vast datasets, enabling deep understanding of therapeutic conversations and mental health contexts.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-slate-700 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Curated Clinical Data</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    We ethically source and anonymize therapeutic data from clinics worldwide, creating specialized models that understand the nuances of mental healthcare conversations.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-slate-700 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <UserCog className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Personalized Therapist Tuning</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Each therapist can customize the AI to match their unique therapeutic style and preferred treatment approaches, creating a truly personalized experience for their patients.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-slate-700 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Network className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Continuous Learning</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Our AI systems continuously improve through feedback loops with healthcare professionals, ensuring the technology evolves alongside best practices in mental healthcare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-2xl p-8 shadow-xl text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:max-w-[60%]">
              <h3 className="text-2xl font-bold mb-2">Technology That Empowers</h3>
              <p className="text-indigo-50">
                Our AI doesn't replace the human connection in therapy—it enhances it. By handling routine tasks and providing insights, Reflecta gives therapists more time to focus on what matters most: their patients.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-md hover:shadow-lg">
                Explore Our Technology
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 