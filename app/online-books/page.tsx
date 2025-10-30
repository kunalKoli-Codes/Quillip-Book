'use client';

import { useEffect, useState } from 'react';
import { supabase, Book, Chapter } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, User, FileText, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function OnlineBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    fetchOnlineBooks();
  }, []);

  const fetchOnlineBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*, author:authors(*), category:categories(*)')
      .eq('is_online', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBooks(data);
    }
  };

  const fetchChapters = async (bookId: string) => {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('book_id', bookId)
      .eq('is_published', true)
      .order('chapter_number');

    if (!error && data) {
      setChapters(data);
    }
  };

  const handleReadBook = (book: Book) => {
    setSelectedBook(book);
    fetchChapters(book.id);
  };

  const handleReadChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Online Books</h1>
          <p className="text-xl text-emerald-100">
            Read our books online, chapter by chapter
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0">
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                {book.cover_image_url ? (
                  <img
                    src={book.cover_image_url}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-slate-400" />
                  </div>
                )}
                <Badge className="absolute top-3 left-3 bg-emerald-500 text-white border-0">
                  Online
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">{book.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {book.author && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <User className="w-4 h-4" />
                      {book.author.name}
                    </div>
                    {book.author.affiliation && (
                      <p className="text-xs text-slate-500 ml-6">{book.author.affiliation}</p>
                    )}
                  </div>
                )}
                {book.description && (
                  <p className="text-sm text-slate-600 line-clamp-3">{book.description}</p>
                )}
                <Button
                  onClick={() => handleReadBook(book)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  Read Chapters
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {books.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No online books available</h3>
            <p className="text-slate-600">Check back later for new publications</p>
          </Card>
        )}
      </div>

      <Dialog open={!!selectedBook} onOpenChange={() => { setSelectedBook(null); setChapters([]); }}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBook?.title}</DialogTitle>
            {selectedBook?.author && (
              <p className="text-slate-600">by {selectedBook.author.name}</p>
            )}
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Available Chapters
            </h3>
            {chapters.length > 0 ? (
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <Card
                    key={chapter.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleReadChapter(chapter)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">
                          Chapter {chapter.chapter_number}: {chapter.title}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-slate-600 text-center py-8">No chapters available yet</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedChapter} onOpenChange={() => setSelectedChapter(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Chapter {selectedChapter?.chapter_number}: {selectedChapter?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="prose max-w-none mt-6">
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {selectedChapter?.content || 'No content available for this chapter.'}
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setSelectedChapter(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
