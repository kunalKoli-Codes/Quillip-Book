'use client';

import { useEffect, useState } from 'react';
import { supabase, Chapter, Book } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Plus, CreditCard as Edit, Trash2, FileText, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<(Chapter & { book?: Book })[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [formData, setFormData] = useState({
    book_id: '',
    chapter_number: '',
    title: '',
    content: '',
    is_published: false,
  });

  useEffect(() => {
    fetchChapters();
    fetchBooks();
  }, []);

  const fetchChapters = async () => {
    const { data, error } = await supabase
      .from('chapters')
      .select('*, book:books(id, title)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setChapters(data);
    }
  };

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('title');

    if (!error && data) {
      setBooks(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const chapterData = {
      ...formData,
      chapter_number: parseInt(formData.chapter_number),
    };

    if (editingChapter) {
      const { error } = await supabase
        .from('chapters')
        .update({ ...chapterData, updated_at: new Date().toISOString() })
        .eq('id', editingChapter.id);

      if (!error) {
        toast.success('Chapter updated successfully');
        fetchChapters();
        handleClose();
      } else {
        toast.error('Failed to update chapter');
      }
    } else {
      const { error } = await supabase
        .from('chapters')
        .insert([chapterData]);

      if (!error) {
        toast.success('Chapter added successfully');
        fetchChapters();
        handleClose();
      } else {
        toast.error('Failed to add chapter');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this chapter?')) {
      const { error } = await supabase
        .from('chapters')
        .delete()
        .eq('id', id);

      if (!error) {
        toast.success('Chapter deleted successfully');
        fetchChapters();
      } else {
        toast.error('Failed to delete chapter');
      }
    }
  };

  const handleEdit = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setFormData({
      book_id: chapter.book_id,
      chapter_number: chapter.chapter_number.toString(),
      title: chapter.title,
      content: chapter.content || '',
      is_published: chapter.is_published,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingChapter(null);
    setFormData({
      book_id: '',
      chapter_number: '',
      title: '',
      content: '',
      is_published: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Book Chapters</h1>
          <p className="text-slate-600 mt-2">Manage chapters for your books</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Chapter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingChapter ? 'Edit Chapter' : 'Add New Chapter'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="book">Book *</Label>
                <Select value={formData.book_id} onValueChange={(value) => setFormData({ ...formData, book_id: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    {books.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chapter_number">Chapter Number *</Label>
                  <Input
                    id="chapter_number"
                    type="number"
                    value={formData.chapter_number}
                    onChange={(e) => setFormData({ ...formData, chapter_number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Chapter Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  placeholder="Enter chapter content or excerpt..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-pink-600 to-rose-600">
                  {editingChapter ? 'Update' : 'Add'} Chapter
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <CardTitle className="text-lg">
                        Chapter {chapter.chapter_number}: {chapter.title}
                      </CardTitle>
                      {chapter.is_published ? (
                        <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded">
                          Published
                        </span>
                      ) : (
                        <span className="text-xs bg-slate-400 text-white px-2 py-1 rounded">
                          Draft
                        </span>
                      )}
                    </div>
                    {chapter.book && (
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {chapter.book.title}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(chapter)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(chapter.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {chapter.content && (
              <CardContent>
                <p className="text-sm text-slate-700 line-clamp-3">{chapter.content}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {chapters.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No chapters yet</h3>
          <p className="text-slate-600 mb-4">Add chapters to your books</p>
        </Card>
      )}
    </div>
  );
}
