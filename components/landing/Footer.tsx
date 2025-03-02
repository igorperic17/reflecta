import React from 'react';
import Link from 'next/link';
import { LogoSVG } from './Illustrations';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { ScrollFadeIn } from './AnimationWrapper';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <ScrollFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8">
                  <LogoSVG />
                </div>
                <span className="text-blue-700 dark:text-blue-300 font-medium">Reflekta</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Enhancing mental healthcare through AI-powered insights and personalized support.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com" className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" className="text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com" className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </ScrollFadeIn>
        
        <ScrollFadeIn delay={0.2}>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between">
            <div className="text-slate-500 dark:text-slate-400 text-sm">
              © 2025 Reflekta. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/accessibility" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                Accessibility
              </Link>
              <Link href="/sitemap" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                Sitemap
              </Link>
              <Link href="/cookies" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
                Cookie Settings
              </Link>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </footer>
  );
}; 