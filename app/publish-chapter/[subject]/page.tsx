'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function SubjectBooksPage() {
  const { subject } = useParams();
  const router = useRouter();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subject) fetchBooks();
  }, [subject]);

  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('book_chapter')
      .select('id, book_name')
      .eq('subject', decodeURIComponent(subject as string));

    if (!error && data) setBooks(data);
    setLoading(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-indigo-600 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <motion.h1
            className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {decodeURIComponent(subject as string)}
          </motion.h1>

          <div className="w-14" /> {/* spacer for center alignment */}
        </motion.div>

        <motion.p
          className="text-slate-600 mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Click a book to view its details 📖
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card
                onClick={() => router.push(`/publish-chapter/book/${book.id}`)}
                className="cursor-pointer backdrop-blur-lg bg-white/70 border border-white/50 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-lg md:text-xl font-semibold text-indigo-700">
                    {book.book_name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {books.length === 0 && (
          <motion.p
            className="text-center text-slate-500 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No books found for this subject.
          </motion.p>
        )}
      </div>
    </div>
  );
}
