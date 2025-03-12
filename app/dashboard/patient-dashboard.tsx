"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { 
  Activity, 
  Brain, 
  Calendar, 
  MessageSquare, 
  ArrowUpRight,
  FileText,
  Clock,
  Eye,
  CalendarDays,
  HeartPulse,
  BookOpen,
  Bell,
  Sparkles
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/dashboard/UserAvatar";
import { Badge } from "@/components/ui/badge";

export default function PatientDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Your Therapy Journey</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Track your progress and manage your therapy sessions
          </p>
        </div>
        <div className="flex gap-2">
          <OutlineButton icon={Calendar} size="default" onClick={() => router.push("/dashboard/sessions")}>
            My Sessions
          </OutlineButton>
          <PrimaryButton icon={Brain} size="default" onClick={() => router.push("/dashboard/sessions")}>
            Start AI Session
          </PrimaryButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Upcoming Sessions</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">3</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              Next session: Tomorrow, 10:30 AM
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">AI Sessions</CardTitle>
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+3</span> this week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Mood Tracking</CardTitle>
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <HeartPulse className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">Improving</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Resources</CardTitle>
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">8</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+2</span> new resources
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Upcoming Sessions
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Resources
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            My Progress
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Upcoming Sessions</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Your scheduled therapy sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Session with Dr. Sarah Johnson</p>
                      <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Human
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Tomorrow, 10:30 AM - 11:30 AM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/sessions/1")}>
                    View Details
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">AI Therapy Session</p>
                      <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        AI
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Available anytime
                    </p>
                  </div>
                  <PrimaryButton size="sm" icon={Brain} onClick={() => router.push("/dashboard/sessions/new")}>
                    Start Now
                  </PrimaryButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Session with Dr. Sarah Johnson</p>
                      <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Human
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Next Week, Monday 2:00 PM - 3:00 PM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/sessions/3")}>
                    View Details
                  </OutlineButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Therapy Resources</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Helpful resources for your mental health journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Mindfulness Techniques</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Guide to daily mindfulness practices
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    View Resource
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Anxiety Management</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Techniques for managing anxiety
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    View Resource
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Sleep Improvement</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Guide to better sleep habits
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    View Resource
                  </OutlineButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Your Progress</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Track your therapy journey and improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Anxiety Management</h3>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Improving</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    You've shown consistent improvement in managing anxiety triggers
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Sleep Quality</h3>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Stable</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your sleep patterns have stabilized over the past month
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Mindfulness Practice</h3>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Excellent</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    You've been consistent with daily mindfulness exercises
                  </p>
                </div>
                
                <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                  <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Your therapist has noted significant improvement in your overall well-being!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 