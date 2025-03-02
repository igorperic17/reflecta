"use client";

import { Shield, Lock, FileCheck } from "lucide-react";

export function PrivacySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_25%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.05),transparent_25%)]"></div>
      
      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 mb-2">
            Privacy & Compliance
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400">
            Your Data, Your Trust, Our Responsibility
          </h2>
          <p className="mx-auto max-w-[800px] text-slate-600 md:text-xl dark:text-slate-300">
            We prioritize privacy and compliance at every step, ensuring your therapeutic journey remains secure and protected.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* HIPAA Compliance */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-slate-700 group">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">HIPAA Compliance & SOC 2</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Our platform adheres to the highest standards of HIPAA compliance and SOC 2 certification, ensuring all patient data is handled with the utmost care and security.
            </p>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
              <li className="flex items-start">
                <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                End-to-end encryption for all data
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                Regular security audits and assessments
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                Strict access controls and authentication
              </li>
            </ul>
          </div>
          
          {/* Legal Compliance */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-slate-700 group">
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FileCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Legal & Regulatory Alignment</h3>
            <p className="text-slate-600 dark:text-slate-300">
              We work closely with government agencies and legal institutions to ensure our platform complies with all relevant healthcare and data protection regulations.
            </p>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
              <li className="flex items-start">
                <span className="mr-2 text-teal-600 dark:text-teal-400">•</span>
                Compliance with local and international laws
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-teal-600 dark:text-teal-400">•</span>
                Regular updates to meet evolving regulations
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-teal-600 dark:text-teal-400">•</span>
                Transparent privacy policies and terms
              </li>
            </ul>
          </div>
          
          {/* Data Privacy */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-slate-700 group">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Patient Data Privacy</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Your therapeutic journey is personal. We implement rigorous privacy measures to ensure your data remains confidential and secure at all times.
            </p>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
              <li className="flex items-start">
                <span className="mr-2 text-purple-600 dark:text-purple-400">•</span>
                Data minimization and purpose limitation
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-600 dark:text-purple-400">•</span>
                Anonymization for research and improvement
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-600 dark:text-purple-400">•</span>
                Patient control over data sharing preferences
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-500 dark:to-teal-500 rounded-2xl p-8 shadow-xl text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:max-w-[60%]">
              <h3 className="text-2xl font-bold mb-2">Our Commitment to You</h3>
              <p className="text-blue-50">
                We believe that effective mental healthcare requires trust. That's why we've built Reflecta with privacy and security as foundational principles, not afterthoughts.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-md hover:shadow-lg">
                Learn More About Our Practices
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 