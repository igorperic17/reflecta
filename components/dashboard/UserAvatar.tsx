"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  imageSrc?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  role?: 'user' | 'therapist' | 'admin' | 'patient';
  className?: string;
}

export function UserAvatar({ 
  name, 
  imageSrc, 
  size = 'md', 
  role = 'user',
  className 
}: UserAvatarProps) {
  // Get initials from name (handle empty names gracefully)
  const initials = name
    ? name
        .split(" ")
        .filter(part => part.length > 0)
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "?";
  
  // Size classes
  const sizeClasses = {
    xs: "h-7 w-7 text-xs",
    sm: "h-9 w-9 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-xl"
  };
  
  // Role-based styling
  const roleStyles = {
    user: {
      border: "border border-blue-200 dark:border-blue-800",
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    therapist: {
      border: "border border-purple-200 dark:border-purple-800",
      gradient: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    admin: {
      border: "border border-amber-200 dark:border-amber-800",
      gradient: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    patient: {
      border: "border border-blue-200 dark:border-blue-800",
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600"
    }
  };

  // Ensure the role exists in roleStyles, default to 'user' if not
  const safeRole = roleStyles[role] ? role : 'user';

  return (
    <Avatar className={cn(
      sizeClasses[size],
      roleStyles[safeRole].border,
      "shadow-sm",
      className
    )}>
      {imageSrc && <AvatarImage src={imageSrc} alt={`${name}'s avatar`} />}
      <AvatarFallback 
        className={cn(
          roleStyles[safeRole].gradient,
          "text-white font-semibold tracking-wide flex items-center justify-center w-full h-full"
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
} 