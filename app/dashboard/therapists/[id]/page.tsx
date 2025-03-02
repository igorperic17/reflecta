"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Edit,
  Save,
  Trash2,
  Shield,
  UserCog,
  FileText,
  Clock,
  Activity,
  Eye
} from "lucide-react";
import { PrimaryButton, OutlineButton, SecondaryButton, SubtleDestructiveButton } from "@/components/dashboard/DashboardButton";
import { useAuth } from "@/lib/auth-context";
import { therapyTypes, getTherapyTypeName } from "@/lib/therapy-types";
import Link from "next/link";

export default function TherapistDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Sample therapist data
  const therapist = {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@reflecta.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    specialties: ["cbt", "mindfulness"],
    patients: 12,
    verified: true,
    joinDate: "Jan 15, 2024",
    bio: "Dr. Sarah Johnson is a licensed clinical psychologist with over 10 years of experience in cognitive behavioral therapy and mindfulness-based interventions. She specializes in treating anxiety, depression, and stress-related disorders.",
    credentials: "Ph.D. in Clinical Psychology, Stanford University\nLicensed Clinical Psychologist (License #12345)\nCertified in Cognitive Behavioral Therapy",
    patientList: [
      { id: "p1", name: "Alex Johnson", lastSession: "Today, 10:30 AM", nextSession: "Mar 15, 2024", status: "Active" },
      { id: "p2", name: "Sam Taylor", lastSession: "Yesterday, 2:00 PM", nextSession: "Mar 10, 2024", status: "Active" },
      { id: "p3", name: "Jamie Smith", lastSession: "Mar 1, 2024", nextSession: "Mar 8, 2024", status: "Active" },
    ],
    recentSessions: [
      { id: "s1", patientName: "Alex Johnson", date: "Today", time: "10:30 AM", type: "Follow-up", isAISession: false },
      { id: "s2", patientName: "Sam Taylor", date: "Yesterday", time: "2:00 PM", type: "Follow-up", isAISession: true },
      { id: "s3", patientName: "Jamie Smith", date: "Mar 1, 2024", time: "11:15 AM", type: "Initial Assessment", isAISession: false },
    ]
  };

  // Check if user is admin
  if (user?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        <Shield className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Access Denied</h1>
        <p className="text-slate-600 dark:text-slate-300 text-center max-w-md">
          You don't have permission to access this page. This area is restricted to administrators only.
        </p>
        <Link href="/dashboard">
          <Button className="mt-4">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <OutlineButton icon={ArrowLeft} onClick={() => router.push("/dashboard/therapists")}>
          Back to Therapists
        </OutlineButton>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column - Therapist info */}
        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-purple-200 dark:border-purple-800 mb-4">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-2xl">
                    {therapist.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{therapist.name}</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge className={`${
                    therapist.status === "Active" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300"
                  }`}>
                    {therapist.status}
                  </Badge>
                  {therapist.verified ? (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      Pending Verification
                    </Badge>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Mail className="h-4 w-4" />
                    <span>{therapist.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Phone className="h-4 w-4" />
                    <span>{therapist.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {therapist.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Users className="h-4 w-4" />
                    <span>{therapist.patients} Patients</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {therapist.specialties.map(specialty => (
                    <Badge key={specialty} className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                      {getTherapyTypeName(specialty)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-slate-900 dark:text-white">Actions</h3>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <OutlineButton size="sm" icon={ArrowLeft} onClick={() => setIsEditing(false)}>
                        Cancel
                      </OutlineButton>
                      <PrimaryButton size="sm" icon={Save}>
                        Save Changes
                      </PrimaryButton>
                    </div>
                  ) : (
                    <PrimaryButton size="sm" icon={Edit} onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </PrimaryButton>
                  )}
                </div>
                <div className="space-y-2">
                  <SecondaryButton icon={Mail} className="w-full justify-start">
                    Send Email
                  </SecondaryButton>
                  <SecondaryButton icon={UserCog} className="w-full justify-start">
                    Manage Account
                  </SecondaryButton>
                  <SubtleDestructiveButton icon={Trash2} className="w-full justify-start">
                    Deactivate Account
                  </SubtleDestructiveButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Tabs */}
        <div className="w-full lg:w-2/3 space-y-6">
          <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                Overview
              </TabsTrigger>
              <TabsTrigger value="patients" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                Patients
              </TabsTrigger>
              <TabsTrigger value="sessions" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                Sessions
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea 
                      defaultValue={therapist.bio}
                      className="min-h-[150px] border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  ) : (
                    <p className="text-slate-700 dark:text-slate-300">{therapist.bio}</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea 
                      defaultValue={therapist.credentials}
                      className="min-h-[150px] border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  ) : (
                    <div className="whitespace-pre-line text-slate-700 dark:text-slate-300">
                      {therapist.credentials}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-medium">New patient added</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Added Alex Johnson as a new patient</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-medium">Session completed</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Completed a session with Sam Taylor</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-medium">Notes updated</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Updated session notes for Jamie Smith</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Today</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients" className="mt-6">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle className="text-slate-900 dark:text-white">Patients</CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">
                        Manage {therapist.name}'s patients
                      </CardDescription>
                    </div>
                    <PrimaryButton icon={Users}>
                      Assign New Patient
                    </PrimaryButton>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200 dark:border-slate-700">
                        <TableHead className="text-slate-700 dark:text-slate-300">Patient</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Last Session</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Next Session</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {therapist.patientList.map((patient) => (
                        <TableRow key={patient.id} className="border-slate-200 dark:border-slate-700">
                          <TableCell className="text-slate-900 dark:text-white">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border-2 border-blue-200 dark:border-blue-800">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs">
                                  {patient.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{patient.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              {patient.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300">{patient.lastSession}</TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300">{patient.nextSession}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Link href={`/dashboard/patients/${patient.id}`}>
                                <OutlineButton size="sm" icon={Eye}>
                                  View
                                </OutlineButton>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="mt-6">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle className="text-slate-900 dark:text-white">Recent Sessions</CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">
                        View {therapist.name}'s recent therapy sessions
                      </CardDescription>
                    </div>
                    <SecondaryButton icon={Calendar}>
                      View All Sessions
                    </SecondaryButton>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200 dark:border-slate-700">
                        <TableHead className="text-slate-700 dark:text-slate-300">Patient</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Date & Time</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Type</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Session Mode</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {therapist.recentSessions.map((session) => (
                        <TableRow key={session.id} className="border-slate-200 dark:border-slate-700">
                          <TableCell className="text-slate-900 dark:text-white">{session.patientName}</TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300">{session.date}, {session.time}</TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300">{session.type}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              session.isAISession 
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" 
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            }`}>
                              {session.isAISession ? "AI-Assisted" : "In-Person"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Link href={`/dashboard/sessions/${session.id}`}>
                                <OutlineButton size="sm" icon={Eye}>
                                  View
                                </OutlineButton>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6 space-y-6">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-slate-700 dark:text-slate-300">Account Status</Label>
                    <Select defaultValue={therapist.status.toLowerCase()}>
                      <SelectTrigger id="status" className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="verified" className="text-slate-700 dark:text-slate-300">Verification Status</Label>
                      <Switch id="verified" defaultChecked={therapist.verified} />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Verified therapists have had their credentials and qualifications checked and approved.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300">Specialties</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                      {therapyTypes.slice(0, 9).map(therapyType => (
                        <div key={therapyType.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`specialty-${therapyType.id}`}
                            defaultChecked={therapist.specialties.includes(therapyType.id)}
                            className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-purple-400"
                          />
                          <Label 
                            htmlFor={`specialty-${therapyType.id}`}
                            className="text-sm text-slate-700 dark:text-slate-300"
                          >
                            {therapyType.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Button variant="link" className="text-purple-600 dark:text-purple-400 p-0 h-auto">
                      Show all specialties
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <PrimaryButton icon={Save}>
                      Save Settings
                    </PrimaryButton>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border border-red-200 dark:border-red-900/50 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">Deactivate Account</h3>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                      Deactivating this account will prevent the therapist from accessing the platform and reassign their patients.
                      This action can be reversed later.
                    </p>
                    <SubtleDestructiveButton icon={Trash2}>
                      Deactivate Account
                    </SubtleDestructiveButton>
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