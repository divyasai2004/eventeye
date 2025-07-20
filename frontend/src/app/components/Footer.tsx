import Link from 'next/link';
import Image from 'next/image';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ChartBarIcon,
  HeartIcon,
  SparklesIcon,
  DocumentTextIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white border-t border-purple-800/30">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Company Info */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3">
              <Image 
                src="/favicon.ico" 
                alt="SponsorSync Logo" 
                width={40} 
                height={40} 
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SponsorSync
              </h3>
            </div>
            <p className="text-gray-300 text-base leading-relaxed font-medium max-w-xs">
              Where student events meet their perfect sponsors.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://x.com/DivyasaiGa46478" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-2.5 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 text-gray-300 hover:text-purple-300 hover:bg-white/20 hover:border-purple-300/50 transition-all duration-300"
                aria-label="Twitter"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="h-5 w-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/divyasai-ganti-44a49b319/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-2.5 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 text-gray-300 hover:text-purple-300 hover:bg-white/20 hover:border-purple-300/50 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="h-5 w-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://myportfolio-zeta-six-93.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-2.5 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 text-gray-300 hover:text-purple-300 hover:bg-white/20 hover:border-purple-300/50 transition-all duration-300"
                aria-label="Portfolio"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <GlobeAltIcon className="h-5 w-5 relative z-10" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-white relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="group flex items-center space-x-3 text-gray-300 hover:text-purple-300 transition-all duration-300 py-1">
                  <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <GlobeAltIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/matches" className="group flex items-center space-x-3 text-gray-300 hover:text-purple-300 transition-all duration-300 py-1">
                  <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <HeartIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">Matches</span>
                </Link>
              </li>
              <li>
                <Link href="/explore" className="group flex items-center space-x-3 text-gray-300 hover:text-purple-300 transition-all duration-300 py-1">
                  <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <GlobeAltIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">Explore Events</span>
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="group flex items-center space-x-3 text-gray-300 hover:text-purple-300 transition-all duration-300 py-1">
                  <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <ChartBarIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/messages" className="group flex items-center space-x-3 text-gray-300 hover:text-purple-300 transition-all duration-300 py-1">
                  <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <UserGroupIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">Messages</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-white relative">
              Get Started
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/profile" className="group flex items-center space-x-3 text-gray-300 hover:text-pink-300 transition-all duration-300 py-1">
                  <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-pink-500/20 transition-colors duration-300">
                    <UserGroupIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">Profile Settings</span>
                </Link>
              </li>
              <li>
                <Link href="/register" className="group flex items-center space-x-3 text-gray-300 hover:text-pink-300 transition-all duration-300 py-1">
                  <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-pink-500/20 transition-colors duration-300">
                    <AcademicCapIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">Join as Student Club</span>
                </Link>
              </li>
              <li>
                <Link href="/register" className="group flex items-center space-x-3 text-gray-300 hover:text-pink-300 transition-all duration-300 py-1">
                  <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-pink-500/20 transition-colors duration-300">
                    <SparklesIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">Join as Sponsor</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="group flex items-center space-x-3 text-gray-300 hover:text-pink-300 transition-all duration-300 py-1">
                  <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-pink-500/20 transition-colors duration-300">
                    <DocumentTextIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">Sign In</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-white relative">
              Contact
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
            </h4>
            <div className="space-y-4">
              <div className="group flex items-start space-x-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-purple-300/30 transition-all duration-300">
                <div className="flex-shrink-0 p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-300">
                  <EnvelopeIcon className="h-5 w-5 text-purple-300" />
                </div>
                <a 
                  href="mailto:hello@sponsorsync.com" 
                  className="text-gray-300 text-sm font-medium hover:text-purple-300 transition-colors duration-300 leading-relaxed"
                >
                  hello@sponsorsync.com
                </a>
              </div>
              <div className="group flex items-start space-x-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-300">
                <div className="flex-shrink-0 p-2 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors duration-300">
                  <PhoneIcon className="h-5 w-5 text-pink-300" />
                </div>
                <a 
                  href="tel:+919876543210" 
                  className="text-gray-300 text-sm font-medium hover:text-pink-300 transition-colors duration-300 leading-relaxed"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="group flex items-start space-x-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-blue-300/30 transition-all duration-300">
                <div className="flex-shrink-0 p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                  <MapPinIcon className="h-5 w-5 text-blue-300" />
                </div>
                <span className="text-gray-300 text-sm font-medium leading-relaxed">Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
          <div className="flex justify-center items-center">
            <div className="text-gray-400 text-sm font-medium text-center w-full tracking-wide">
              © {currentYear} <span className="font-semibold text-purple-300">SponsorSync</span>. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 