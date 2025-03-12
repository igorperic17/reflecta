"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  CreditCard, 
  Activity,
  Download,
  DollarSign,
  Calendar,
  Plus,
  FileText,
  Users,
  Clock,
  Filter
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/dashboard/UserAvatar";

// Define session purchase type
interface SessionPurchase {
  id: string;
  patientName: string;
  date: string;
  sessionCount: number;
  totalAmount: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  nextSession?: string;
}

export default function BillingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Sample billing data
  const invoices = [
    {
      id: "INV-001",
      date: "Mar 01, 2024",
      amount: user?.role === "patient" ? "$150.00" : "$2,450.00",
      status: "Paid",
      description: user?.role === "patient" ? "Therapy Session" : "Monthly Platform Fee"
    },
    {
      id: "INV-002",
      date: "Feb 01, 2024",
      amount: user?.role === "patient" ? "$150.00" : "$2,300.00",
      status: "Paid",
      description: user?.role === "patient" ? "Therapy Session" : "Monthly Platform Fee"
    },
    {
      id: "INV-003",
      date: "Jan 01, 2024",
      amount: user?.role === "patient" ? "$150.00" : "$2,150.00",
      status: "Paid",
      description: user?.role === "patient" ? "Therapy Session" : "Monthly Platform Fee"
    }
  ];

  // Sample purchased sessions data for therapists
  const purchasedSessions: SessionPurchase[] = [
    {
      id: "PS-001",
      patientName: "Alex Johnson",
      date: "Mar 15, 2024",
      sessionCount: 5,
      totalAmount: "$600.00",
      status: 'upcoming',
      nextSession: "Mar 22, 2024 at 10:00 AM"
    },
    {
      id: "PS-002",
      patientName: "Sam Taylor",
      date: "Mar 10, 2024",
      sessionCount: 3,
      totalAmount: "$360.00",
      status: 'upcoming',
      nextSession: "Mar 24, 2024 at 2:30 PM"
    },
    {
      id: "PS-003",
      patientName: "Jamie Smith",
      date: "Feb 28, 2024",
      sessionCount: 10,
      totalAmount: "$1,020.00",
      status: 'upcoming',
      nextSession: "Mar 21, 2024 at 11:15 AM"
    },
    {
      id: "PS-004",
      patientName: "Riley Wilson",
      date: "Feb 15, 2024",
      sessionCount: 1,
      totalAmount: "$120.00",
      status: 'completed'
    },
    {
      id: "PS-005",
      patientName: "Morgan Lee",
      date: "Jan 20, 2024",
      sessionCount: 5,
      totalAmount: "$600.00",
      status: 'completed'
    }
  ];

  // Filter purchased sessions based on tab
  const filteredSessions = purchasedSessions.filter(session => {
    if (activeTab === "all") return true;
    return session.status === activeTab;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" />
            <span>Financial Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Billing & Payments
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {user?.role === "patient" 
              ? "Manage your payment methods and view invoices" 
              : "Manage your billing information and revenue"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {user?.role === "therapist" && (
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm mb-6">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Patient Sessions
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  Sessions purchased by your patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 w-full mb-4">
                    <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
                      All Sessions
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
                      Upcoming
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
                      Completed
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab} className="m-0">
                    <div className="space-y-4">
                      {filteredSessions.length > 0 ? (
                        filteredSessions.map((session) => (
                          <div 
                            key={session.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 gap-4"
                          >
                            <div className="flex items-center gap-4">
                              <UserAvatar 
                                name={session.patientName} 
                                role="user"
                                size="md"
                              />
                              <div>
                                <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                                  {session.patientName}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Purchased: {session.date}
                                  </p>
                                  <Badge className={`text-xs ${
                                    session.status === 'upcoming' 
                                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
                                      : session.status === 'completed'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                  }`}>
                                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                  </Badge>
                                </div>
                                {session.nextSession && (
                                  <p className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 mt-1">
                                    <Clock className="h-3 w-3" />
                                    Next: {session.nextSession}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-4 mt-3 md:mt-0">
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                                    {session.sessionCount} {session.sessionCount === 1 ? 'Session' : 'Sessions'}
                                  </Badge>
                                  <p className="text-sm font-medium text-slate-900 dark:text-white">{session.totalAmount}</p>
                                </div>
                              </div>
                              <OutlineButton size="sm">
                                View Details
                              </OutlineButton>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Users className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No sessions found</h3>
                          <p className="text-slate-500 dark:text-slate-400 max-w-md">
                            {activeTab === "all" 
                              ? "You don't have any purchased sessions at the moment." 
                              : `You don't have any ${activeTab} sessions.`
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Recent Invoices
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                {user?.role === "patient" 
                  ? "Your recent payment history" 
                  : "Your recent billing history"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div 
                    key={invoice.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          {invoice.description}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {invoice.date} • {invoice.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{invoice.amount}</p>
                        <p className={`text-xs mt-1 ${
                          invoice.status === "Paid" 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-amber-600 dark:text-amber-400"
                        }`}>
                          {invoice.status}
                        </p>
                      </div>
                      <OutlineButton size="sm" icon={Download}>
                        Download
                      </OutlineButton>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {user?.role === "therapist" && (
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Revenue Overview
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  Summary of your earnings and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <p className="text-xs text-slate-500 dark:text-slate-400">This Month</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$3,250.00</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      +12% from last month
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Last Month</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$2,890.00</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      +8% from previous
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Year to Date</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$8,740.00</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      +15% year over year
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Payment Method
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Manage your payment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">•••• •••• •••• 4242</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Expires 12/25</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 dark:border-blue-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Default</span>
                </div>
              </div>
              
              <PrimaryButton icon={Plus} className="w-full">
                Add Payment Method
              </PrimaryButton>
              
              {user?.role === "patient" && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Billing Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Name on Card</Label>
                      <Input 
                        id="name" 
                        defaultValue={user?.name} 
                        className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-slate-700 dark:text-slate-300">Billing Address</Label>
                      <Input 
                        id="address" 
                        defaultValue="123 Main St" 
                        className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-slate-700 dark:text-slate-300">City</Label>
                        <Input 
                          id="city" 
                          defaultValue="San Francisco" 
                          className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip" className="text-slate-700 dark:text-slate-300">ZIP Code</Label>
                        <Input 
                          id="zip" 
                          defaultValue="94103" 
                          className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                      </div>
                    </div>
                    <OutlineButton className="w-full">
                      Update Billing Info
                    </OutlineButton>
                  </div>
                </div>
              )}
              
              {user?.role === "therapist" && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Payout Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank" className="text-slate-700 dark:text-slate-300">Bank Account</Label>
                      <Input 
                        id="bank" 
                        defaultValue="•••• •••• •••• 1234" 
                        disabled
                        className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routing" className="text-slate-700 dark:text-slate-300">Routing Number</Label>
                      <Input 
                        id="routing" 
                        defaultValue="••••••••" 
                        disabled
                        className="border-slate-200 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule" className="text-slate-700 dark:text-slate-300">Payout Schedule</Label>
                      <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-700/50 text-sm text-slate-700 dark:text-slate-300">
                        Weekly (Every Monday)
                      </div>
                    </div>
                    <OutlineButton className="w-full">
                      Update Payout Info
                    </OutlineButton>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 