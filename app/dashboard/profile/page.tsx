"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  User, 
  Activity,
  Mail,
  Shield,
  Lock,
  Bell,
  Settings
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Account Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Your Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 border-4 border-blue-200 dark:border-blue-800 mb-4">
                  <AvatarImage src="/images/avatar.png" alt="User avatar" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-2xl">
                    {user?.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{user?.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{user?.email}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 capitalize">
                  {user?.role}
                </div>
                <div className="w-full mt-6">
                  <OutlineButton className="w-full mb-3">
                    Edit Profile
                  </OutlineButton>
                  <PrimaryButton className="w-full">
                    Change Password
                  </PrimaryButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
              <TabsTrigger value="personal" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300">First Name</Label>
                      <Input 
                        id="firstName" 
                        defaultValue={user?.name.split(" ")[0]} 
                        className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300">Last Name</Label>
                      <Input 
                        id="lastName" 
                        defaultValue={user?.name.split(" ")[1] || ""} 
                        className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue={user?.email} 
                      className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <PrimaryButton>
                      Save Changes
                    </PrimaryButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Security Settings
                  </CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    Manage your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-slate-700 dark:text-slate-300">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-slate-700 dark:text-slate-300">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <PrimaryButton>
                      Update Password
                    </PrimaryButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">Email Notifications</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Receive email notifications for important updates
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 dark:bg-blue-500 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">Session Reminders</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Receive reminders before your scheduled sessions
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 dark:bg-blue-500 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">Marketing Updates</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Receive updates about new features and services
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <PrimaryButton>
                      Save Preferences
                    </PrimaryButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 