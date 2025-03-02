import React, { useEffect, useRef, useState } from 'react';

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

interface ScrollFadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  delay?: number;
  className?: string;
}

export const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({
  children,
  direction = 'up',
  threshold = 0.1,
  delay = 0,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once the element is visible, we can stop observing it
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before the element comes into view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  // Define animation classes based on direction
  let animationClass = '';
  if (isVisible) {
    switch (direction) {
      case 'up':
        animationClass = 'animate-fade-in-up';
        break;
      case 'down':
        animationClass = 'animate-fade-in-down';
        break;
      case 'left':
        animationClass = 'animate-fade-in-left';
        break;
      case 'right':
        animationClass = 'animate-fade-in-right';
        break;
      default:
        animationClass = 'animate-fade-in';
    }
  }

  // Set initial transform based on direction
  let initialTransform = 'none';
  if (!isVisible) {
    switch (direction) {
      case 'up':
        initialTransform = 'translateY(20px)';
        break;
      case 'down':
        initialTransform = 'translateY(-20px)';
        break;
      case 'left':
        initialTransform = 'translateX(20px)';
        break;
      case 'right':
        initialTransform = 'translateX(-20px)';
        break;
    }
  }

  return (
    <div
      ref={ref}
      className={`${isVisible ? animationClass : ''} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : initialTransform,
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        transitionDelay: isVisible ? `${delay}s` : '0s',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}; 