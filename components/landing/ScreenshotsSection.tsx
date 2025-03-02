import React, { useState } from 'react';
import { ScrollFadeIn } from './AnimationWrapper';
import { Zap, Users, CreditCard, Brain, Image as ImageIcon } from 'lucide-react';

// Placeholder component to use if both primary and fallback images fail
const ImagePlaceholder = ({ title }: { title: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800">
    <ImageIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">{title} Screenshot</p>
    <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Image could not be loaded</p>
  </div>
);

interface FeatureProps {
  title: string;
  description: string;
  imageSrc: string;
  fallbackImageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  reverse?: boolean;
}

const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  imageSrc,
  fallbackImageSrc,
  imageAlt,
  icon,
  reverse = false
}) => {
  const [imgError, setImgError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  const handleImageError = () => {
    console.log(`Error loading image: ${imageSrc}, trying fallback`);
    setImgError(true);
  };

  const handleFallbackError = () => {
    console.log(`Error loading fallback image: ${fallbackImageSrc}, using placeholder`);
    setFallbackError(true);
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      <div className={`${reverse ? 'lg:order-2 lg:col-span-4' : 'lg:order-1 lg:col-span-4'}`}>
        <ScrollFadeIn direction={reverse ? "right" : "left"} delay={0.1}>
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium">
              {icon}
              <span>{title}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>
        </ScrollFadeIn>
      </div>
      
      <div className={`${reverse ? 'lg:order-1 lg:col-span-8' : 'lg:order-2 lg:col-span-8'}`}>
        <ScrollFadeIn direction={reverse ? "left" : "right"} delay={0.2}>
          <div className="relative h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-400/5 group-hover:from-blue-400/10 group-hover:to-indigo-400/10 transition-all duration-500 z-10"></div>
            {fallbackError ? (
              <ImagePlaceholder title={title} />
            ) : (
              <img
                src={imgError ? fallbackImageSrc : imageSrc}
                alt={imageAlt}
                className="w-full h-full object-contain p-2"
                loading="lazy"
                onError={imgError ? handleFallbackError : handleImageError}
              />
            )}
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export const ScreenshotsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_25%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.05),transparent_25%)]"></div>
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <ScrollFadeIn>
          <div className="flex flex-col items-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
              <Zap className="w-4 h-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Comprehensive Tools for Mental Healthcare
            </h2>
            <p className="mx-auto max-w-[800px] text-slate-600 md:text-xl dark:text-slate-300">
              Reflekta provides a complete suite of tools designed specifically for mental healthcare professionals to enhance their practice.
            </p>
          </div>
        </ScrollFadeIn>
        
        <div className="space-y-32">
          <Feature
            title="AI-Powered Tools"
            description="Leverage cutting-edge AI to enhance your therapy sessions. Our AI tools help analyze session transcripts, provide insights, and suggest therapeutic approaches based on patient responses and progress."
            imageSrc="/images/screenshots/ai-tools.png"
            fallbackImageSrc="/ai-tools.png"
            imageAlt="AI Tools Dashboard"
            icon={<Brain className="w-4 h-4" />}
            reverse={false}
          />
          
          <Feature
            title="Patient Management"
            description="Easily manage your patient records, track progress, and organize session notes. Our intuitive interface makes it simple to access patient history, treatment plans, and upcoming appointments."
            imageSrc="/images/screenshots/patient-management.png"
            fallbackImageSrc="/patient-management.png"
            imageAlt="Patient Management Dashboard"
            icon={<Users className="w-4 h-4" />}
            reverse={true}
          />
          
          <Feature
            title="Billing Dashboard"
            description="Streamline your practice's finances with our comprehensive billing system. Track payments, generate invoices, and manage insurance claims all in one place, saving you time and reducing administrative overhead."
            imageSrc="/images/screenshots/billing.png"
            fallbackImageSrc="/billing.png"
            imageAlt="Billing Dashboard"
            icon={<CreditCard className="w-4 h-4" />}
            reverse={false}
          />
          
          <Feature
            title="Therapy Methods"
            description="Access a wide range of evidence-based therapy methods and resources. Our platform provides templates, guides, and tools for various therapeutic approaches, helping you deliver the best care for your patients."
            imageSrc="/images/screenshots/therapy-methods.png"
            fallbackImageSrc="/therapy-methods.png"
            imageAlt="Therapy Methods Dashboard"
            icon={<Brain className="w-4 h-4" />}
            reverse={true}
          />
        </div>
      </div>
    </section>
  );
}; 