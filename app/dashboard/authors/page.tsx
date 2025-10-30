'use client';

import { useEffect, useState } from 'react';
import { supabase, Author } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Plus, CreditCard as Edit, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    bio: '',
    image_url: '',
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAuthors(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // sanitize image_url (empty string → null)
    const payload = {
      ...formData,
      image_url: formData.image_url?.trim() ? formData.image_url : null,
      updated_at: new Date().toISOString(),
    };

    if (editingAuthor) {
      const { error } = await supabase
        .from('authors')
        .update(payload)
        .eq('id', editingAuthor.id);

      if (!error) {
        toast.success('Author updated successfully');
        fetchAuthors();
        handleClose();
      } else {
        toast.error('Failed to update author');
      }
    } else {
      const { error } = await supabase.from('authors').insert([payload]);

      if (!error) {
        toast.success('Author added successfully');
        fetchAuthors();
        handleClose();
      } else {
        toast.error('Failed to add author');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this author?')) {
      const { error } = await supabase.from('authors').delete().eq('id', id);

      if (!error) {
        toast.success('Author deleted successfully');
        fetchAuthors();
      } else {
        toast.error('Failed to delete author');
      }
    }
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      email: author.email || '',
      affiliation: author.affiliation || '',
      bio: author.bio || '',
      image_url: author.image_url || '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAuthor(null);
    setFormData({
      name: '',
      email: '',
      affiliation: '',
      bio: '',
      image_url: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Authors</h1>
          <p className="text-slate-600 mt-2">Manage your publication authors</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Author
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAuthor ? 'Edit Author' : 'Add New Author'}
              </DialogTitle>
              <DialogDescription>
                {editingAuthor
                  ? 'Update the details of the author below.'
                  : 'Fill out the form to add a new author to the list.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="affiliation">Affiliation</Label>
                <Input
                  id="affiliation"
                  value={formData.affiliation}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliation: e.target.value })
                  }
                  placeholder="University, Institution, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600"
                >
                  {editingAuthor ? 'Update' : 'Add'} Author
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <Card
            key={author.id}
            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {author.image_url && author.image_url.startsWith('http') ? (
                    <img
                      src={author.image_url}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-slate-100"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{author.name}</CardTitle>
                    {author.affiliation && (
                      <p className="text-sm text-slate-600 mt-1">
                        {author.affiliation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {author.email && (
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Email:</span> {author.email}
                </p>
              )}
              {author.bio && (
                <p className="text-sm text-slate-700 line-clamp-3">
                  {author.bio}
                </p>
              )}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(author)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(author.id)}
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

      {authors.length === 0 && (
        <Card className="p-12 text-center">
          <User className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No authors yet
          </h3>
          <p className="text-slate-600 mb-4">
            Get started by adding your first author
          </p>
        </Card>
      )}
    </div>
  );
}
