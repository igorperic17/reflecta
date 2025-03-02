import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Brain, Users, Zap, BarChart, Lock } from 'lucide-react';
import { ScrollFadeIn } from './AnimationWrapper';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  colorClass,
  delay = 0
}) => {
  return (
    <ScrollFadeIn direction="up" delay={delay}>
      <div className="group">
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <CardHeader>
            <div className={`w-12 h-12 mb-4 rounded-full ${colorClass} flex items-center justify-center`}>
              {icon}
            </div>
            <CardTitle className="text-blue-700 dark:text-blue-300">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </CardContent>
        </Card>
      </div>
    </ScrollFadeIn>
  );
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.05),transparent_40%)]"></div>
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <ScrollFadeIn>
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Advanced Mental Healthcare Technology
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
              Reflekta combines cutting-edge AI with clinical expertise to enhance therapeutic experiences for both providers and patients.
            </p>
          </div>
        </ScrollFadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Privacy-First Approach"
            description="Your mental health data is personal. We ensure all information is encrypted, secure, and compliant with healthcare regulations."
            colorClass="bg-blue-100 dark:bg-blue-900/30"
            icon={<Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            delay={0.1}
          />
          
          <FeatureCard
            title="AI-Powered Insights"
            description="Our specialized AI models analyze patterns and provide data-driven guidance, helping clinicians make more informed decisions."
            colorClass="bg-indigo-100 dark:bg-indigo-900/30"
            icon={<Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            delay={0.2}
          />
          
          <FeatureCard
            title="Enhanced Therapeutic Alliance"
            description="Reflekta strengthens the connection between therapists and patients, creating a bridge between sessions and supporting continuous care."
            colorClass="bg-purple-100 dark:bg-purple-900/30"
            icon={<Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
            delay={0.3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <FeatureCard
            title="Data-Driven Progress Tracking"
            description="Monitor treatment outcomes with comprehensive analytics and visualizations that highlight improvement areas and successes."
            colorClass="bg-violet-100 dark:bg-violet-900/30"
            icon={<BarChart className="w-6 h-6 text-violet-600 dark:text-violet-400" />}
            delay={0.4}
          />
          
          <FeatureCard
            title="HIPAA Compliant Security"
            description="Enterprise-grade security protocols ensure your practice meets all regulatory requirements while protecting sensitive patient information."
            colorClass="bg-emerald-100 dark:bg-emerald-900/30"
            icon={<Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
            delay={0.5}
          />
          
          <FeatureCard
            title="Seamless Integration"
            description="Easily integrate with your existing EHR systems and clinical workflows to enhance productivity without disruption."
            colorClass="bg-amber-100 dark:bg-amber-900/30"
            icon={<Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}; 