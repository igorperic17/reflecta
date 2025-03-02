import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PatientsPage() {
  // Sample patient data
  const patients = [
    {
      id: "1",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      status: "Active",
      lastSession: "Today, 10:30 AM",
      aiInteractions: 12,
      progress: "Improving",
    },
    {
      id: "2",
      name: "John Smith",
      email: "john.smith@example.com",
      status: "Active",
      lastSession: "Yesterday, 2:00 PM",
      aiInteractions: 8,
      progress: "Stable",
    },
    {
      id: "3",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      status: "Inactive",
      lastSession: "Feb 25, 2024",
      aiInteractions: 3,
      progress: "Needs attention",
    },
    {
      id: "4",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      status: "Active",
      lastSession: "Feb 28, 2024",
      aiInteractions: 15,
      progress: "Improving",
    },
    {
      id: "5",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      status: "Active",
      lastSession: "Feb 27, 2024",
      aiInteractions: 7,
      progress: "Stable",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Manage your patients and their therapy progress
          </p>
        </div>
        <Button>Add New Patient</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>All Patients</CardTitle>
              <CardDescription>
                A list of all your patients and their status
              </CardDescription>
            </div>
            <div className="w-full md:w-auto">
              <Input placeholder="Search patients..." className="max-w-sm" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Session</TableHead>
                <TableHead>AI Interactions</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{patient.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{patient.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.status === "Active" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                        : "bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100"
                    }`}>
                      {patient.status}
                    </div>
                  </TableCell>
                  <TableCell>{patient.lastSession}</TableCell>
                  <TableCell>{patient.aiInteractions}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.progress === "Improving" 
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" 
                        : patient.progress === "Stable"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    }`}>
                      {patient.progress}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/patients/${patient.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Link href={`/dashboard/patients/${patient.id}/sessions/new`}>
                        <Button size="sm">New Session</Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 