'use client';

import { Book } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { BookOpen, User } from 'lucide-react';
import Link from 'next/link';

interface BookCarouselProps {
  books: Book[];
}

export function BookCarousel({ books }: BookCarouselProps) {
  if (books.length === 0) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {books.map((book) => (
          <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1">
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0">
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  {book.cover_image_url ? (
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-slate-400" />
                    </div>
                  )}
                  {book.is_featured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-2 mb-2 min-h-[3.5rem]">
                    {book.title}
                  </h3>
                  {book.author && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{book.author.name}</span>
                    </div>
                  )}
                  {book.author?.affiliation && (
                    <p className="text-xs text-slate-500 mb-3 line-clamp-1">
                      {book.author.affiliation}
                    </p>
                  )}
                  {book.category && (
                    <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-3">
                      {book.category.name}
                    </span>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <span className="text-2xl font-bold text-slate-900">${book.price}</span>
                    <Link
                      href={`/book-store?book=${book.id}`}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View Details →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
