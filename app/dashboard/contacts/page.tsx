'use client';

import { useEffect, useState } from 'react';
import { supabase, ContactSubmission } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Mail, User, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setContacts(data);
    }
  };

  const updateStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);

    if (!error) {
      toast.success('Status updated');
      fetchContacts();
    } else {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (!error) {
        toast.success('Message deleted');
        fetchContacts();
      } else {
        toast.error('Failed to delete message');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'read':
        return 'bg-yellow-500';
      case 'replied':
        return 'bg-emerald-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Contact Messages</h1>
        <p className="text-slate-600 mt-2">View and manage customer inquiries</p>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <CardTitle className="text-lg">{contact.subject}</CardTitle>
                      <Badge className={`${getStatusColor(contact.status)} text-white`}>
                        {contact.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {contact.name}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {contact.email}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(contact.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Select
                    value={contact.status}
                    onValueChange={(value) => updateStatus(contact.id, value as 'new' | 'read' | 'replied')}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{contact.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {contacts.length === 0 && (
        <Card className="p-12 text-center">
          <MessageSquare className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No messages yet</h3>
          <p className="text-slate-600">Contact submissions will appear here</p>
        </Card>
      )}
    </div>
  );
}
