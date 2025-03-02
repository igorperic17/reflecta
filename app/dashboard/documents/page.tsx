"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  FileText, 
  Activity,
  Download,
  Upload,
  File,
  FileCheck,
  Search,
  Plus
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { Input } from "@/components/ui/input";

export default function DocumentsPage() {
  const { user } = useAuth();
  
  // Sample documents data
  const documents = [
    {
      id: "1",
      name: "Intake Form.pdf",
      date: "Mar 01, 2024",
      size: "1.2 MB",
      type: "PDF",
      category: "Forms"
    },
    {
      id: "2",
      name: "Treatment Plan.docx",
      date: "Feb 15, 2024",
      size: "845 KB",
      type: "DOCX",
      category: "Treatment"
    },
    {
      id: "3",
      name: "Progress Notes - Feb 2024.pdf",
      date: "Mar 02, 2024",
      size: "2.1 MB",
      type: "PDF",
      category: "Notes"
    },
    {
      id: "4",
      name: "Insurance Information.pdf",
      date: "Jan 10, 2024",
      size: "980 KB",
      type: "PDF",
      category: "Insurance"
    },
    {
      id: "5",
      name: "Consent for Treatment.pdf",
      date: "Jan 05, 2024",
      size: "1.5 MB",
      type: "PDF",
      category: "Forms"
    }
  ];

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case "DOCX":
        return <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <File className="w-5 h-5 text-slate-600 dark:text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Document Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Your Documents
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Access and manage your healthcare documents
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input placeholder="Search documents..." className="pl-9 border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400" />
          </div>
          <PrimaryButton icon={Upload}>
            Upload Document
          </PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              All Documents
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              {documents.length} documents
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <FileCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              Forms
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              {documents.filter(d => d.category === "Forms").length} documents
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              Treatment
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              {documents.filter(d => d.category === "Treatment").length} documents
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              Add Category
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Create a new category
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Recent Documents
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Access and manage your healthcare documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((document) => (
              <div 
                key={document.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                    {getFileIcon(document.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                      {document.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {document.date} • {document.size} • {document.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <OutlineButton size="sm" icon={Download}>
                    Download
                  </OutlineButton>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 