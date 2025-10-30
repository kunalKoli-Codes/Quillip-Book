'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, FolderTree, FileText } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    books: 0,
    authors: 0,
    categories: 0,
    chapters: 0,
  });

  useEffect(() => {
    (async () => {
      const [booksRes, authorsRes, categoriesRes, chaptersRes] = await Promise.all([
        supabase.from('books').select('id', { count: 'exact', head: true }),
        supabase.from('authors').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('chapters').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        books: booksRes.count || 0,
        authors: authorsRes.count || 0,
        categories: categoriesRes.count || 0,
        chapters: chaptersRes.count || 0,
      });
    })();
  }, []);

  const statCards = [
    { title: 'Total Books', value: stats.books, icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { title: 'Total Authors', value: stats.authors, icon: Users, color: 'from-emerald-500 to-teal-500' },
    { title: 'Categories', value: stats.categories, icon: FolderTree, color: 'from-orange-500 to-amber-500' },
    { title: 'Total Chapters', value: stats.chapters, icon: FileText, color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600 mt-2">Welcome to your publication house management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="overflow-hidden border-0 shadow-xl">
              <CardHeader className={`bg-gradient-to-br ${stat.color} text-white pb-2`}>
                <CardTitle className="flex items-center justify-between text-base font-semibold">
                  <span>{stat.title}</span>
                  <Icon className="w-5 h-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your publication content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/dashboard/books" className="block p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">
              <h3 className="font-semibold text-slate-900">Manage Books</h3>
              <p className="text-sm text-slate-600">Add, edit, or remove books from your catalog</p>
            </a>
            <a href="/dashboard/authors" className="block p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">
              <h3 className="font-semibold text-slate-900">Manage Authors</h3>
              <p className="text-sm text-slate-600">Update author profiles and information</p>
            </a>
            <a href="/dashboard/chapters" className="block p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">
              <h3 className="font-semibold text-slate-900">Publish Chapters</h3>
              <p className="text-sm text-slate-600">Add new chapters to existing books</p>
            </a>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-slate-500">
              <p>Activity tracking will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
