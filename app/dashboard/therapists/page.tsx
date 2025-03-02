"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UserPlus, 
  Search, 
  Eye, 
  Settings,
  Activity,
  X,
  Mail,
  Shield,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { therapyTypes, getTherapyTypeName } from "@/lib/therapy-types";
import { useAuth } from "@/lib/auth-context";
import { User } from "@/lib/types";

export default function TherapistsPage() {
  const { user } = useAuth();
  const [showAddTherapistDialog, setShowAddTherapistDialog] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [isVerified, setIsVerified] = useState(true);

  // Sample therapist data
  const therapists = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@reflecta.com",
      status: "Active",
      specialties: ["cbt", "mindfulness"],
      patients: 12,
      verified: true,
      joinDate: "Jan 15, 2024"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      email: "michael.chen@reflecta.com",
      status: "Active",
      specialties: ["psychodynamic", "family"],
      patients: 8,
      verified: true,
      joinDate: "Feb 3, 2024"
    },
    {
      id: "3",
      name: "Dr. Lisa Rodriguez",
      email: "lisa.rodriguez@reflecta.com",
      status: "Pending",
      specialties: ["dbt", "emdr"],
      patients: 0,
      verified: false,
      joinDate: "Mar 1, 2024"
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      email: "james.wilson@reflecta.com",
      status: "Active",
      specialties: ["couples", "interpersonal"],
      patients: 15,
      verified: true,
      joinDate: "Dec 10, 2023"
    },
    {
      id: "5",
      name: "Dr. Emily Taylor",
      email: "emily.taylor@reflecta.com",
      status: "Inactive",
      specialties: ["art", "play"],
      patients: 5,
      verified: true,
      joinDate: "Nov 22, 2023"
    },
  ];

  // Handle adding a new therapist
  const handleAddTherapist = () => {
    // In a real app, you would make an API call to add the therapist
    console.log("Adding new therapist with specialties:", selectedSpecialties);
    console.log("Verified:", isVerified);
    setShowAddTherapistDialog(false);
    setSelectedSpecialties([]);
    setIsVerified(true);
  };

  // Handle specialty selection
  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(current => 
      current.includes(specialty)
        ? current.filter(s => s !== specialty)
        : [...current, specialty]
    );
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Therapist Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 dark:from-purple-400 dark:via-indigo-400 dark:to-blue-400">
            Therapists
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Manage therapist accounts and their specialties
          </p>
        </div>
        <PrimaryButton 
          icon={UserPlus}
          onClick={() => setShowAddTherapistDialog(true)}
        >
          Add New Therapist
        </PrimaryButton>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-slate-900 dark:text-white">All Therapists</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                A list of all therapists and their status
              </CardDescription>
            </div>
            <div className="w-full md:w-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input placeholder="Search therapists..." className="max-w-sm pl-9 border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-700">
                <TableHead className="text-slate-700 dark:text-slate-300">Therapist</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Specialties</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Patients</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Verified</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Join Date</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {therapists.map((therapist) => (
                <TableRow key={therapist.id} className="border-slate-200 dark:border-slate-700">
                  <TableCell className="text-slate-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-purple-200 dark:border-purple-800">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                          {therapist.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{therapist.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{therapist.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      therapist.status === "Active" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : therapist.status === "Pending"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300"
                    }`}>
                      {therapist.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">
                    <div className="flex flex-wrap gap-1">
                      {therapist.specialties.map(specialty => (
                        <div key={specialty} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          {getTherapyTypeName(specialty).split(' ')[0]}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">{therapist.patients}</TableCell>
                  <TableCell>
                    {therapist.verified ? (
                      <div className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Verified</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Pending</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">{therapist.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/therapists/${therapist.id}`}>
                        <OutlineButton size="sm" icon={Eye}>
                          View
                        </OutlineButton>
                      </Link>
                      <OutlineButton size="sm" icon={Mail}>
                        Contact
                      </OutlineButton>
                      <Link href={`/dashboard/therapists/${therapist.id}/settings`}>
                        <OutlineButton size="sm" icon={Settings}>
                          Settings
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

      {/* Add Therapist Dialog */}
      <Dialog open={showAddTherapistDialog} onOpenChange={setShowAddTherapistDialog}>
        <DialogContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-white">Add New Therapist</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Enter the therapist's details and assign their specialties
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300">First Name</Label>
                <Input 
                  id="firstName" 
                  className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300">Last Name</Label>
                <Input 
                  id="lastName" 
                  className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300">Therapy Specialties</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {therapyTypes.map(therapyType => (
                  <div key={therapyType.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`specialty-${therapyType.id}`}
                      checked={selectedSpecialties.includes(therapyType.id)}
                      onChange={() => handleSpecialtyChange(therapyType.id)}
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="credentials" className="text-slate-700 dark:text-slate-300">Credentials</Label>
              <Textarea 
                id="credentials" 
                className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[100px]"
                placeholder="Enter therapist's credentials, certifications, and education..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="verified" 
                checked={isVerified} 
                onCheckedChange={setIsVerified}
              />
              <Label htmlFor="verified" className="text-slate-700 dark:text-slate-300">
                Verified Therapist
              </Label>
            </div>
          </div>
          <DialogFooter>
            <OutlineButton onClick={() => setShowAddTherapistDialog(false)} icon={X}>
              Cancel
            </OutlineButton>
            <PrimaryButton onClick={handleAddTherapist} icon={UserPlus}>
              Add Therapist
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 