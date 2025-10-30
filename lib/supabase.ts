import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Author = {
  id: string;
  name: string;
  email?: string;
  affiliation?: string;
  bio?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
};

export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  isbn?: string;
  description?: string;
  cover_image_url?: string;
  price: number;
  publication_date?: string;
  pages: number;
  language: string;
  author_id?: string;
  category_id?: string;
  is_online: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  author?: Author;
  category?: Category;
};

export type Chapter = {
  id: string;
  book_id: string;
  chapter_number: number;
  title: string;
  content?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
};

export type PublishBook = {
  id: string;
  title: string;
  name: string;
  scope: string;
  email: string;
  number: string;
  affiliation: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
};

export type BookChapter = {
  id: string;
  subject: string;
  book_name: string;
  volume: string;
  chief_editor_name: string; 
  chief_editor_email: string;
  chief_editor_phone: string;
  chief_editor_affiliation: string;
  chief_editor_picture_url?: string;
  scope: string;
  about_book: string;
  cover_page_url?: string;
  syllabus_url?: string;
  meta_description?: string;
  deadline: string;
  charges: string;
  cover_page?: string;
  syllabus?: string;
  meta_keyword?: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
};
