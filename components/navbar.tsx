'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookMarked, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/book-store', label: 'Book Store' },
  { href: '/online-books', label: 'E-Books' },
  { href: '/publish-book', label: 'Publish Book' },
  { href: '/publish-chapter', label: 'Publish Book Chapter' },
  { href: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login') || pathname?.startsWith('/register')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            
            <div>
              <div>
              <Image
            src="/image/logo2.jpeg"
            alt="Publication House Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
              </div>
            </div>
            <span className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Quillip Publications
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

       

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
