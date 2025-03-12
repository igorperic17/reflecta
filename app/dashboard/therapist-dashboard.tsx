"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FileText,
  Clock,
  Eye,
  CheckCircle2,
  CalendarDays
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/dashboard/UserAvatar";

export default function TherapistDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Therapist Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Manage your patients and therapy sessions
          </p>
        </div>
        <div className="flex gap-2">
          <OutlineButton icon={Calendar} size="default" onClick={() => router.push("/dashboard/sessions")}>
            View Schedule
          </OutlineButton>
          <PrimaryButton icon={UserPlus} size="default" onClick={() => router.push("/dashboard/patients")}>
            New Patient
          </PrimaryButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">My Patients</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">24</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+2</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Upcoming Sessions</CardTitle>
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">8</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+3</span> this week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">AI Assisted Sessions</CardTitle>
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">42</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Earnings</CardTitle>
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">$4,320</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+8.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
          <TabsTrigger value="today" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Today's Schedule
          </TabsTrigger>
          <TabsTrigger value="patients" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Recent Patients
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
            Session Notes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Today's Schedule</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Your upcoming therapy sessions for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Session with Jane Doe</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      10:30 AM - 11:30 AM
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
                    <p className="text-sm font-medium text-slate-900 dark:text-white">AI Session Review - John Smith</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      1:00 PM - 1:30 PM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/sessions/2")}>
                    View Details
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Session with Robert Johnson</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      3:00 PM - 4:00 PM
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
        <TabsContent value="patients" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Recent Patients</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Your recently active patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <UserAvatar name="Jane Doe" role="user" size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Jane Doe</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Last session: Today, 10:30 AM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/patients/p1")}>
                    View Profile
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <UserAvatar name="John Smith" role="user" size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">John Smith</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Last session: Yesterday, 2:00 PM
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/patients/p2")}>
                    View Profile
                  </OutlineButton>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <UserAvatar name="Robert Johnson" role="user" size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Robert Johnson</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Last session: 2 days ago
                    </p>
                  </div>
                  <OutlineButton size="sm" icon={Eye} onClick={() => router.push("/dashboard/patients/p3")}>
                    View Profile
                  </OutlineButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Recent Session Notes</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Your latest therapy session notes
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
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Jane Doe - Session Notes</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Today, 10:30 AM
                      </p>
                    </div>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    View Notes
                  </OutlineButton>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">John Smith - Session Notes</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Yesterday, 2:00 PM
                      </p>
                    </div>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    View Notes
                  </OutlineButton>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Robert Johnson - Session Notes</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        2 days ago
                      </p>
                    </div>
                  </div>
                  <OutlineButton size="sm" icon={Eye}>
                    View Notes
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