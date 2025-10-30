'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, Users, BookMarked, FolderTree, FileText, MessageSquare, LogOut, Chrome as Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/authors', label: 'Authors', icon: Users },
  { href: '/dashboard/categories', label: 'Categories', icon: FolderTree },
  { href: '/dashboard/books', label: 'Books', icon: BookOpen },
  { href: '/dashboard/chapters', label: 'Chapters', icon: FileText },
  { href: '/dashboard/contacts', label: 'Contact Messages', icon: MessageSquare },
  { href: '/dashboard/publishbook', label: 'Publish Book Enquiry', icon: MessageSquare },
  { href: '/dashboard/bookchapter', label: 'Book Chapter', icon: MessageSquare },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <BookMarked className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Publication</h1>
          <p className="text-xs text-slate-400">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <Link href="/" className="block mb-3">
          <Button variant="outline" className="w-full justify-start gap-3 bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white">
            <Home className="w-5 h-5" />
            View Website
          </Button>
        </Link>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-3 bg-red-900/20 border-red-800/50 text-red-400 hover:bg-red-900/40 hover:text-red-300"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
