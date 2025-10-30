"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Loader2,
  BookOpen,
  Mail,
  Phone,
  Building2,
  FileText,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (id) fetchBookDetail();
  }, [id]);

  const fetchBookDetail = async () => {
    const { data, error } = await supabase
      .from("book_chapter")
      .select("*")
      .eq("id", id)
      .single();
    if (!error && data) setBook(data);
    setLoading(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-slate-700 mx-auto" />
          <p className="text-slate-600 animate-pulse">
            Loading book details...
          </p>
        </div>
      </div>
    );

  if (!book)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="p-8 max-w-md text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto" />
          <p className="text-xl font-semibold text-slate-700">Book not found</p>
          <p className="text-slate-500">
            The book you're looking for doesn't exist.
          </p>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="grid lg:grid-cols-3 gap-8">
          {book.cover_page && (
            <Card className="lg:col-span-1 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={book.cover_page}
                  alt={book.book_name}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    imageLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {book.syllabus && (
                <Button
                  asChild
                  className="w-full mt-6 bg-slate-900 hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
                >
                  <a
                    href={book.syllabus}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Syllabus
                  </a>
                </Button>
              )}
            </Card>
          )}

          <Card
            className={`${
              book.cover_page ? "lg:col-span-2" : "lg:col-span-3"
            } p-8 hover:shadow-xl transition-all duration-300`}
          >
            <div className="space-y-6">
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                      {book.book_name}
                    </h1>
                    <Badge variant="secondary" className="text-sm px-4 py-1">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {book.subject}
                    </Badge>
                  </div>
                </div>

                {book.about_book && (
                  <p className="text-slate-700 text-lg leading-relaxed border-l-4 border-slate-900 pl-4 py-2">
                    {book.about_book}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
                {book.volume && (
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                    <BookOpen className="w-5 h-5 text-slate-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Volume
                      </p>
                      <p className="text-slate-900 font-semibold">
                        {book.volume}
                      </p>
                    </div>
                  </div>
                )}

                {book.scope && (
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                    <Target className="w-5 h-5 text-slate-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Scope
                      </p>
                      <div
                        className="text-slate-900 font-semibold prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: book.scope }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-6 mt-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-300">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Chief Editor
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {book.chief_editor_name?.charAt(0) || "E"}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {book.chief_editor_name}
                      </p>
                      <p className="text-sm text-slate-500">Editor</p>
                    </div>
                  </div>

                  {book.chief_editor_affiliation && (
                    <div className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                      <Building2 className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-500">Affiliation</p>
                        <p className="text-slate-900">
                          {book.chief_editor_affiliation}
                        </p>
                      </div>
                    </div>
                  )}

                  {book.chief_editor_email && (
                    <div className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200 group">
                      <Mail className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-500">Email</p>
                        <a
                          href={`mailto:${book.chief_editor_email}`}
                          className="text-slate-900 hover:text-slate-700 transition-colors break-all"
                        >
                          {book.chief_editor_email}
                        </a>
                      </div>
                    </div>
                  )}

                  {book.chief_editor_phone && (
                    <div className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                      <Phone className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-500">Phone</p>
                        <a
                          href={`tel:${book.chief_editor_phone}`}
                          className="text-slate-900 hover:text-slate-700 transition-colors"
                        >
                          {book.chief_editor_phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {book.charges && (
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                      <Target className="w-5 h-5 text-slate-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          Publication Fee
                        </p>
                        <div
                          className="[&>p]:m-0 text-slate-900 font-semibold"
                          dangerouslySetInnerHTML={{ __html: book.charges }}
                        />
                      </div>
                    </div>
                  )}
                  {book.deadline && (
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                      <Target className="w-5 h-5 text-slate-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          Deadline
                        </p>
                        <p className="text-slate-900 font-semibold">
                          {new Date(book.deadline).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
