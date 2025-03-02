import React from 'react';
import Link from 'next/link';
import { LogoSVG } from './Illustrations';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-white dark:bg-slate-900 border-t border-teal-100 dark:border-slate-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8">
              <LogoSVG />
            </div>
            <span className="text-teal-700 dark:text-teal-300 font-medium">Reflecta</span>
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-sm">
            © 2024 Reflecta. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300 transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300 transition-colors duration-200">
              Terms
            </Link>
            <Link href="/contact" className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300 transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}; 