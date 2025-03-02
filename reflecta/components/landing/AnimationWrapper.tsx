"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function AnimationWrapper({ 
  children, 
  delay = 0, 
  duration = 3 
}: AnimationWrapperProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  direction = "none" 
}: FadeInProps) {
  const directionVariants = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: { opacity: 0 }
  };

  return (
    <motion.div
      initial={{ 
        ...directionVariants[direction], 
        opacity: 0 
      }}
      animate={{ 
        x: 0, 
        y: 0, 
        opacity: 1 
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from: "left" | "right" | "top" | "bottom";
}

export function SlideIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  from = "left" 
}: SlideInProps) {
  const fromVariants = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    top: { y: -100, opacity: 0 },
    bottom: { y: 100, opacity: 0 }
  };

  return (
    <motion.div
      initial={fromVariants[from]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
} 