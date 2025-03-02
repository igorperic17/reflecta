"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { 
  CreditCard, 
  Activity,
  Download,
  DollarSign,
  Calendar,
  Plus,
  FileText
} from "lucide-react";
import { PrimaryButton, OutlineButton } from "@/components/dashboard/DashboardButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BillingPage() {
  const { user } = useAuth();
  
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 