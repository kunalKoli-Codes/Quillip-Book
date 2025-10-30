'use client';

import { useEffect, useState } from 'react';
import { supabase, Book, Author, Category } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Plus, CreditCard as Edit, Trash2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    isbn: '',
    description: '',
    cover_image_url: '',
    price: '',
    publication_date: '',
    pages: '',
    language: 'English',
    author_id: '',
    category_id: '',
    is_online: false,
    is_featured: false,
  });

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*, author:authors(*), category:categories(*)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBooks(data);
    }
  };

  const fetchAuthors = async () => {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('name');

    if (!error && data) {
      setAuthors(data);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (!error && data) {
      setCategories(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      pages: parseInt(formData.pages) || 0,
      author_id: formData.author_id || null,
      category_id: formData.category_id || null,
    };

    if (editingBook) {
      const { error } = await supabase
        .from('books')
        .update({ ...bookData, updated_at: new Date().toISOString() })
        .eq('id', editingBook.id);

      if (!error) {
        toast.success('Book updated successfully');
        fetchBooks();
        handleClose();
      } else {
        toast.error('Failed to update book');
      }
    } else {
      const { error } = await supabase
        .from('books')
        .insert([bookData]);

      if (!error) {
        toast.success('Book added successfully');
        fetchBooks();
        handleClose();
      } else {
        toast.error('Failed to add book');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);

      if (!error) {
        toast.success('Book deleted successfully');
        fetchBooks();
      } else {
        toast.error('Failed to delete book');
      }
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      subtitle: book.subtitle || '',
      isbn: book.isbn || '',
      description: book.description || '',
      cover_image_url: book.cover_image_url || '',
      price: book.price.toString(),
      publication_date: book.publication_date || '',
      pages: book.pages.toString(),
      language: book.language,
      author_id: book.author_id || '',
      category_id: book.category_id || '',
      is_online: book.is_online,
      is_featured: book.is_featured,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBook(null);
    setFormData({
      title: '',
      subtitle: '',
      isbn: '',
      description: '',
      cover_image_url: '',
      price: '',
      publication_date: '',
      pages: '',
      language: 'English',
      author_id: '',
      category_id: '',
      is_online: false,
      is_featured: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Books</h1>
          <p className="text-slate-600 mt-2">Manage your book catalog</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Select value={formData.author_id} onValueChange={(value) => setFormData({ ...formData, author_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    type="number"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publication_date">Publication Date</Label>
                  <Input
                    id="publication_date"
                    type="date"
                    value={formData.publication_date}
                    onChange={(e) => setFormData({ ...formData, publication_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover_image_url">Cover Image URL</Label>
                <Input
                  id="cover_image_url"
                  value={formData.cover_image_url}
                  onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_online"
                    checked={formData.is_online}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_online: checked })}
                  />
                  <Label htmlFor="is_online">Available Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                  {editingBook ? 'Update' : 'Add'} Book
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            {book.cover_image_url && (
              <div className="h-48 overflow-hidden bg-slate-100">
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
              {book.subtitle && (
                <p className="text-sm text-slate-600 line-clamp-1">{book.subtitle}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              {book.author && (
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Author:</span> {book.author.name}
                </p>
              )}
              {book.category && (
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Category:</span> {book.category.name}
                </p>
              )}
              <p className="text-sm text-slate-700">
                <span className="font-medium">Price:</span> ${book.price}
              </p>
              <div className="flex gap-2 pt-2">
                {book.is_featured && (
                  <span className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded">
                    Featured
                  </span>
                )}
                {book.is_online && (
                  <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded">
                    Online
                  </span>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(book)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(book.id)}
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {books.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No books yet</h3>
          <p className="text-slate-600 mb-4">Start building your catalog</p>
        </Card>
      )}
    </div>
  );
}
