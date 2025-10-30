'use client';

import { useEffect, useState } from 'react';
import { supabase, Book, Category } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, User, Filter } from 'lucide-react';

export default function BookStorePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchBooks = async () => {
    let query = supabase
      .from('books')
      .select('*, author:authors(*), category:categories(*)')
      .order('created_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category_id', selectedCategory);
    }

    const { data, error } = await query;

    if (!error && data) {
      setBooks(data);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Book Store</h1>
          <p className="text-xl text-blue-100">
            Browse our complete collection of books
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-slate-200 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600" />
              <span className="font-semibold text-slate-700">Filter by Category:</span>
            </div>
            <Button
              onClick={() => setSelectedCategory('all')}
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className={selectedCategory === 'all' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : ''}
            >
              All Books
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={selectedCategory === category.id ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : ''}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredBooks.length}</span> books
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
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
                {book.is_featured && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                    Featured
                  </Badge>
                )}
                {book.is_online && (
                  <Badge className="absolute top-3 left-3 bg-emerald-500 text-white border-0">
                    Online
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">{book.title}</CardTitle>
                {book.subtitle && (
                  <p className="text-sm text-slate-600 line-clamp-1">{book.subtitle}</p>
                )}
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
                {book.category && (
                  <Badge variant="outline" className="text-xs">
                    {book.category.name}
                  </Badge>
                )}
                {book.description && (
                  <p className="text-sm text-slate-600 line-clamp-3">{book.description}</p>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="text-2xl font-bold text-slate-900">${book.price}</span>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No books found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </Card>
        )}
      </div>
    </div>
  );
}
