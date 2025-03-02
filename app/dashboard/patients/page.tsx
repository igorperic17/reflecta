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
  MessageSquare,
  Activity,
  X
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { therapyTypes, getTherapyTypeName } from "@/lib/therapy-types";
import { useAuth } from "@/lib/auth-context";

export default function PatientsPage() {
  const { user } = useAuth();
  const [showAddPatientDialog, setShowAddPatientDialog] = useState(false);
  const [selectedTreatmentMethod, setSelectedTreatmentMethod] = useState("");

  // Sample patient data with treatment methods
  const patients = [
    {
      id: "1",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      status: "Active",
      lastSession: "Today, 10:30 AM",
      aiInteractions: 12,
      progress: "Improving",
      treatmentMethod: "cbt"
    },
    {
      id: "2",
      name: "John Smith",
      email: "john.smith@example.com",
      status: "Active",
      lastSession: "Yesterday, 2:00 PM",
      aiInteractions: 8,
      progress: "Stable",
      treatmentMethod: "mindfulness"
    },
    {
      id: "3",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      status: "Inactive",
      lastSession: "Feb 25, 2024",
      aiInteractions: 3,
      progress: "Needs attention",
      treatmentMethod: "interpersonal"
    },
    {
      id: "4",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      status: "Active",
      lastSession: "Feb 28, 2024",
      aiInteractions: 15,
      progress: "Improving",
      treatmentMethod: "dbt"
    },
    {
      id: "5",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      status: "Active",
      lastSession: "Feb 27, 2024",
      aiInteractions: 7,
      progress: "Stable",
      treatmentMethod: "family"
    },
  ];

  // Handle adding a new patient
  const handleAddPatient = () => {
    // In a real app, you would make an API call to add the patient
    console.log("Adding new patient with treatment method:", selectedTreatmentMethod);
    setShowAddPatientDialog(false);
    setSelectedTreatmentMethod("");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Patient Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Patients
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Manage your patients and their therapy progress
          </p>
        </div>
        <PrimaryButton 
          icon={UserPlus}
          onClick={() => setShowAddPatientDialog(true)}
        >
          Add New Patient
        </PrimaryButton>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-slate-900 dark:text-white">All Patients</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                A list of all your patients and their status
              </CardDescription>
            </div>
            <div className="w-full md:w-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input placeholder="Search patients..." className="max-w-sm pl-9 border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-700">
                <TableHead className="text-slate-700 dark:text-slate-300">Patient</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Treatment Method</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Last Session</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">AI Interactions</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Progress</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="border-slate-200 dark:border-slate-700">
                  <TableCell className="text-slate-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-blue-200 dark:border-blue-800">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                          {patient.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{patient.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.status === "Active" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300"
                    }`}>
                      {patient.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {getTherapyTypeName(patient.treatmentMethod)}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">{patient.lastSession}</TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">{patient.aiInteractions}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.progress === "Improving" 
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" 
                        : patient.progress === "Stable"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {patient.progress}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/patients/${patient.id}`}>
                        <OutlineButton size="sm" icon={Eye}>
                          View
                        </OutlineButton>
                      </Link>
                      <Link href={`/dashboard/patients/${patient.id}/sessions/new`}>
                        <PrimaryButton size="sm" icon={MessageSquare}>
                          New Session
                        </PrimaryButton>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Patient Dialog */}
      <Dialog open={showAddPatientDialog} onOpenChange={setShowAddPatientDialog}>
        <DialogContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-white">Add New Patient</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Enter the patient's details and assign a treatment method
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
              <Label htmlFor="treatmentMethod" className="text-slate-700 dark:text-slate-300">Treatment Method</Label>
              <Select value={selectedTreatmentMethod} onValueChange={setSelectedTreatmentMethod}>
                <SelectTrigger id="treatmentMethod" className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400">
                  <SelectValue placeholder="Select a treatment method" />
                </SelectTrigger>
                <SelectContent>
                  {user?.specialties?.length ? (
                    // Only show therapist's specialties
                    user.specialties.map(specialtyId => {
                      const therapyType = therapyTypes.find(type => type.id === specialtyId);
                      return (
                        <SelectItem key={specialtyId} value={specialtyId}>
                          {therapyType?.name}
                        </SelectItem>
                      );
                    })
                  ) : (
                    // Show all therapy types if no specialties are set
                    therapyTypes.map(therapyType => (
                      <SelectItem key={therapyType.id} value={therapyType.id}>
                        {therapyType.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {user?.specialties?.length === 0 && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  Tip: Set your therapy specialties in your profile to see a filtered list here.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-slate-700 dark:text-slate-300">Initial Notes</Label>
              <Textarea 
                id="notes" 
                className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[100px]"
                placeholder="Enter any initial notes about the patient..."
              />
            </div>
          </div>
          <DialogFooter>
            <OutlineButton onClick={() => setShowAddPatientDialog(false)} icon={X}>
              Cancel
            </OutlineButton>
            <PrimaryButton onClick={handleAddPatient} icon={UserPlus}>
              Add Patient
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 