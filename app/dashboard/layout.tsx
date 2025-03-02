"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart, 
  Settings, 
  LogOut,
  Brain,
  MessageSquare,
  Bell,
  CreditCard,
  FileText,
  User,
  HeartPulse
} from "lucide-react";
import { GhostButton, SubtleDestructiveButton } from "@/components/dashboard/DashboardButton";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  // Show nothing while checking authentication
  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Loading...</h2>
          <p className="text-slate-600 dark:text-slate-300">Please wait while we verify your credentials.</p>
        </div>
      </div>
    );
  }

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const commonItems = [
      {
        href: "/dashboard",
        icon: LayoutDashboard,
        label: "Dashboard"
      },
      {
        href: "/dashboard/sessions",
        icon: Calendar,
        label: "Sessions"
      },
      {
        href: "/dashboard/ai-tools",
        icon: Brain,
        label: "AI Tools"
      }
    ];

    if (user.role === "admin") {
      return [
        ...commonItems,
        {
          href: "/dashboard/patients",
          icon: Users,
          label: "Patients"
        },
        {
          href: "/dashboard/therapists",
          icon: HeartPulse,
          label: "Therapists"
        },
        {
          href: "/dashboard/reports",
          icon: BarChart,
          label: "Reports"
        },
        {
          href: "/dashboard/settings",
          icon: Settings,
          label: "Settings"
        }
      ];
    } else if (user.role === "therapist") {
      return [
        ...commonItems,
        {
          href: "/dashboard/patients",
          icon: Users,
          label: "My Patients"
        },
        {
          href: "/dashboard/billing",
          icon: CreditCard,
          label: "Billing"
        },
        {
          href: "/dashboard/profile",
          icon: User,
          label: "Profile"
        }
      ];
    } else { // patient
      return [
        ...commonItems,
        {
          href: "/dashboard/documents",
          icon: FileText,
          label: "Documents"
        },
        {
          href: "/dashboard/billing",
          icon: CreditCard,
          label: "Billing"
        },
        {
          href: "/dashboard/profile",
          icon: User,
          label: "Profile"
        }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              r
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">reflekta.ai</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <GhostButton icon={item.icon} className="w-full justify-start">
                {item.label}
              </GhostButton>
            </Link>
          ))}
          <SubtleDestructiveButton 
            icon={LogOut}
            className="w-full justify-start" 
            onClick={handleLogout}
          >
            Logout
          </SubtleDestructiveButton>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center space-x-3">
            <Avatar className="border-2 border-blue-200 dark:border-blue-800">
              <AvatarImage src="/images/avatar.png" alt="User avatar" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 w-full">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            r
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">reflekta.ai</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-300">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-300">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
} 