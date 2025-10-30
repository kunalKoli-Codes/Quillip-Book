'use client';

import { useEffect, useState } from 'react';
import { supabase, BookChapter } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BookChaptersPage() {
  const [chapters, setChapters] = useState<BookChapter[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BookChapter | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    book_name: '',
    volume: '',
    chief_editor_name: '',
    chief_editor_email: '',
    chief_editor_phone: '',
    chief_editor_affiliation: '',
    chief_editor_picture_url: '',
    scope: '',
    deadline: '',
    charges: '',
    about_book: '',
    cover_page: '',
    syllabus: '',
    meta_description: '',
    meta_keyword: '',
    status: 'new' as 'new' | 'read' | 'replied',
  });

  // 🔧 Quill modules (full-feature toolbar)
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    const { data, error } = await supabase
      .from('book_chapter')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setChapters(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      const { error } = await supabase
        .from('book_chapter')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', editing.id);

      if (!error) {
        toast.success('Book Chapter updated successfully');
        fetchChapters();
        handleClose();
      } else toast.error('Failed to update Book Chapter');
    } else {
      const { error } = await supabase.from('book_chapter').insert([formData]);
      if (!error) {
        toast.success('Book Chapter added successfully');
        fetchChapters();
        handleClose();
      } else toast.error('Failed to add Book Chapter');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this book chapter?')) {
      const { error } = await supabase.from('book_chapter').delete().eq('id', id);
      if (!error) {
        toast.success('Deleted successfully');
        fetchChapters();
      } else toast.error('Failed to delete');
    }
  };

  const handleEdit = (chapter: BookChapter) => {
    setEditing(chapter);
    setFormData({
      subject: chapter.subject,
      book_name: chapter.book_name,
      volume: chapter.volume,
      chief_editor_name: chapter.chief_editor_name,
      chief_editor_email: chapter.chief_editor_email,
      chief_editor_phone: chapter.chief_editor_phone,
      chief_editor_affiliation: chapter.chief_editor_affiliation,
      chief_editor_picture_url: chapter.chief_editor_picture_url || '',
      scope: chapter.scope,
      deadline: chapter.deadline || '',
      charges: chapter.charges || '',
      about_book: chapter.about_book,
      cover_page: chapter.cover_page || '',
      syllabus: chapter.syllabus || '',
      meta_description: chapter.meta_description || '',
      meta_keyword: chapter.meta_keyword || '',
      status: chapter.status,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setFormData({
      subject: '',
      book_name: '',
      volume: '',
      chief_editor_name: '',
      chief_editor_email: '',
      chief_editor_phone: '',
      chief_editor_affiliation: '',
      chief_editor_picture_url: '',
      scope: '',
      deadline: '',
      charges: '',
      about_book: '',
      cover_page: '',
      syllabus: '',
      meta_description: '',
      meta_keyword: '',
      status: 'new',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Book Chapters</h1>
          <p className="text-slate-600 mt-2">Manage Book Chapter submissions</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg">
              <Plus className="w-4 h-4 mr-2" /> Add Book Chapter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Book Chapter' : 'Add New Book Chapter'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subject *</Label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Book Name *</Label>
                  <Input
                    value={formData.book_name}
                    onChange={(e) => setFormData({ ...formData, book_name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Volume</Label>
                  <Input
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  />
                </div>

                {/* 🔥 Scope with HTML Editor */}
                <div className="space-y-2 col-span-2">
                  <Label>Scope *</Label>
                  <div className="border rounded-md overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={formData.scope}
                      onChange={(value) => setFormData({ ...formData, scope: value })}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write scope details here..."
                      className="h-40"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>About Book *</Label>
                <Textarea
                  value={formData.about_book}
                  onChange={(e) => setFormData({ ...formData, about_book: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold text-lg">Chief Editor Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input
                      value={formData.chief_editor_name}
                      onChange={(e) => setFormData({ ...formData, chief_editor_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={formData.chief_editor_email}
                      onChange={(e) => setFormData({ ...formData, chief_editor_email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input
                      value={formData.chief_editor_phone}
                      onChange={(e) => setFormData({ ...formData, chief_editor_phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Affiliation *</Label>
                    <Input
                      value={formData.chief_editor_affiliation}
                      onChange={(e) =>
                        setFormData({ ...formData, chief_editor_affiliation: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Editor Picture URL</Label>
                    <Input
                      value={formData.chief_editor_picture_url}
                      onChange={(e) =>
                        setFormData({ ...formData, chief_editor_picture_url: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold text-lg">Additional Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cover Page URL</Label>
                    <Input
                      value={formData.cover_page}
                      onChange={(e) => setFormData({ ...formData, cover_page: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Syllabus URL</Label>
                    <Input
                      value={formData.syllabus}
                      onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                    />
                  </div>
                </div>

                {/* 🔥 Charges with HTML Editor */}
                <div className="space-y-2 col-span-2">
                  <Label>Charges</Label>
                  <div className="border rounded-md overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={formData.charges}
                      onChange={(value) => setFormData({ ...formData, charges: value })}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Enter charges or publication fee details..."
                      className="h-40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={formData.meta_description}
                    onChange={(e) =>
                      setFormData({ ...formData, meta_description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Meta Keywords (comma separated)</Label>
                  <Input
                    value={formData.meta_keyword}
                    onChange={(e) => setFormData({ ...formData, meta_keyword: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end mt-4">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-pink-600 to-rose-600">
                  {editing ? 'Update' : 'Add'} Chapter
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
                    <CardTitle className="text-lg">
                      {chapter.book_name} ({chapter.volume || 'N/A'})
                    </CardTitle>
                    <p className="text-sm text-slate-600">{chapter.subject}</p>
                    <p className="text-xs text-slate-500">
                      Chief Editor: {chapter.chief_editor_name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(chapter)}>
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
            <CardContent>
              <p className="text-sm text-slate-700 line-clamp-3">{chapter.about_book}</p>
            </CardContent>
          </Card>
        ))}

        {chapters.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Book Chapters Yet</h3>
            <p className="text-slate-600 mb-4">Add your first book chapter submission</p>
          </Card>
        )}
      </div>
    </div>
  );
}
