"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  Brain, 
  Activity,
  MessageSquare,
  FileText,
  BarChart,
  Lightbulb,
  Sparkles
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";

export default function AIToolsPage() {
  const { user } = useAuth();
  
  // AI tools based on user role
  const getAITools = () => {
    const commonTools = [
      {
        id: "1",
        title: "Session Insights",
        description: "AI-powered analysis of therapy sessions to identify patterns and insights.",
        icon: MessageSquare,
        color: "blue"
      },
      {
        id: "2",
        title: "Progress Tracking",
        description: "Track and visualize patient progress over time with AI-generated metrics.",
        icon: BarChart,
        color: "indigo"
      }
    ];

    if (user?.role === "patient") {
      return [
        ...commonTools,
        {
          id: "3",
          title: "Mood Journal",
          description: "AI-enhanced journaling tool to track emotions and identify patterns.",
          icon: FileText,
          color: "purple"
        },
        {
          id: "4",
          title: "Coping Strategies",
          description: "Personalized coping strategies based on your specific needs and history.",
          icon: Lightbulb,
          color: "amber"
        }
      ];
    } else {
      return [
        ...commonTools,
        {
          id: "3",
          title: "Treatment Recommendations",
          description: "AI-generated treatment suggestions based on patient data and clinical research.",
          icon: Sparkles,
          color: "purple"
        },
        {
          id: "4",
          title: "Clinical Documentation",
          description: "Automated assistance for creating and managing clinical documentation.",
          icon: FileText,
          color: "emerald"
        }
      ];
    }
  };

  const aiTools = getAITools();

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
      case "indigo":
        return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
      case "purple":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
      case "amber":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400";
      case "emerald":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>AI Assistance</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            AI Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {user?.role === "patient" 
              ? "AI-powered tools to support your mental health journey" 
              : "AI-powered tools to enhance your therapeutic practice"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiTools.map((tool) => (
          <Card key={tool.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <div className={`w-12 h-12 rounded-full ${getColorClasses(tool.color)} flex items-center justify-center flex-shrink-0`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-slate-900 dark:text-white">{tool.title}</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 mt-1">
                  {tool.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <PrimaryButton className="w-full">
                Launch Tool
              </PrimaryButton>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 text-white shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:max-w-[60%]">
              <h3 className="text-2xl font-bold mb-2">AI-Powered Mental Healthcare</h3>
              <p className="text-blue-50">
                Our AI tools are designed to enhance the therapeutic experience, not replace it. They provide data-driven insights while maintaining the human connection at the core of mental healthcare.
              </p>
            </div>
            <div className="flex-shrink-0">
              <OutlineButton className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Learn More About Our AI
              </OutlineButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 