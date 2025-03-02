import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface DashboardButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof Button>, 'variant'> {
  icon?: LucideIcon;
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'subtle-destructive';
}

export const DashboardButton: React.FC<DashboardButtonProps> = ({
  children,
  className,
  icon: Icon,
  variant = 'primary',
  ...props
}) => {
  // Map our custom variants to the base Button variants
  const getBaseVariant = () => {
    switch (variant) {
      case 'primary':
        return 'default';
      case 'outline':
        return 'outline';
      case 'secondary':
        return 'secondary';
      case 'ghost':
        return 'ghost';
      case 'destructive':
        return 'destructive';
      case 'subtle-destructive':
        return 'ghost';
      default:
        return 'default';
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 border-0";
      case 'outline':
        return "border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300";
      case 'secondary':
        return "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300";
      case 'ghost':
        return "text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-700/50 transition-all duration-300";
      case 'destructive':
        return "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-300 border-0";
      case 'subtle-destructive':
        return "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300";
      default:
        return "";
    }
  };

  return (
    <Button 
      variant={getBaseVariant() as any}
      className={cn(getButtonStyles(), className)} 
      {...props}
    >
      {Icon && <Icon className={cn("h-4 w-4", children ? "mr-2" : "")} />}
      {children}
    </Button>
  );
};

export const PrimaryButton: React.FC<DashboardButtonProps> = (props) => (
  <DashboardButton variant="primary" {...props} />
);

export const OutlineButton: React.FC<DashboardButtonProps> = (props) => (
  <DashboardButton variant="outline" {...props} />
);

export const SecondaryButton: React.FC<DashboardButtonProps> = (props) => (
  <DashboardButton variant="secondary" {...props} />
);

export const GhostButton: React.FC<DashboardButtonProps> = (props) => (
  <DashboardButton variant="ghost" {...props} />
);

export const DestructiveButton: React.FC<DashboardButtonProps> = (props) => (
  <DashboardButton variant="destructive" {...props} />
);

export const SubtleDestructiveButton: React.FC<DashboardButtonProps> = (props) => (
  <DashboardButton variant="subtle-destructive" {...props} />
); 