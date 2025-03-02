"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { 
  Users, 
  Activity, 
  Brain, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  UserPlus,
  ArrowUpRight,
  LineChart,
  FileText,
  Clock,
  Eye
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Practice Overview</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Here's an overview of your mental healthcare practice
          </p>
        </div>
        <PrimaryButton icon={UserPlus} size="default">
          New Patient
        </PrimaryButton>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Patients</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">42</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+2</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Sessions</CardTitle>
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">18</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+4</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">AI Interactions</CardTitle>
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">127</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+22%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Revenue</CardTitle>
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">$24,565</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Recent Activity</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Your recent patient interactions and AI-assisted sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Session with Jane Doe</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Today, 10:30 AM - 11:30 AM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={FileText}>
                    View Notes
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">AI Interaction - John Smith</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Yesterday, 8:45 PM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    Review
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">New Patient Registration</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Yesterday, 3:20 PM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Users}>
                    View Profile
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Session with Robert Johnson</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Yesterday, 1:00 PM - 2:00 PM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={FileText}>
                    View Notes
                  </OutlineButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Analytics</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                View detailed analytics about your practice and patient interactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-md">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-300">Analytics charts will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Reports</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Generate and view reports for insurance claims and practice management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Monthly Revenue Report</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        February 2024
                      </p>
                    </div>
                  </div>
                  <OutlineButton size="sm" icon={ArrowUpRight}>
                    Download
                  </OutlineButton>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Patient Activity Summary</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Last 30 days
                      </p>
                    </div>
                  </div>
                  <OutlineButton size="sm" icon={ArrowUpRight}>
                    Download
                  </OutlineButton>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Insurance Claims Report</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        February 2024
                      </p>
                    </div>
                  </div>
                  <OutlineButton size="sm" icon={ArrowUpRight}>
                    Download
                  </OutlineButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 