import React from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  delay = 0 
}) => {
  return (
    <div
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'none';
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  direction = 'none',
  delay = 0,
  className = ''
}) => {
  const animationClass = direction === 'up' ? 'animate-fade-in-up' : 'animate-fade-in';
  
  return (
    <div
      className={`${animationClass} ${className}`}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}; 