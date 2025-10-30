"use client";

import { useEffect, useState } from "react";
import { supabase, Book, Author } from "@/lib/supabase";
import { BookCarousel } from "@/components/book-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
  BookMarked,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    (async () => {
      const [booksRes, authorsRes] = await Promise.all([
        supabase
          .from("books")
          .select("*, author:authors(*), category:categories(*)")
          .eq("is_featured", true)
          .order("created_at", { ascending: false })
          .limit(8),
        supabase
          .from("authors")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6),
      ]);

      if (booksRes.data) setFeaturedBooks(booksRes.data);
      if (authorsRes.data) setAuthors(authorsRes.data);

      const allBooksRes = await supabase
        .from("books")
        .select("*, author:authors(*), category:categories(*)")
        .order("created_at", { ascending: false })
        .limit(12);

      if (allBooksRes.data) setAllBooks(allBooksRes.data);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Premium Publication House
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Exceptional
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                Literary Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Explore our curated collection of books from world-class authors
              and scholars
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/book-store">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl h-14 px-8 text-lg font-semibold"
                >
                  Browse Books
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/publish-book">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold"
                >
                  Publish with Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {featuredBooks.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-3">
                  Featured Books
                </h2>
                <p className="text-lg text-slate-600">
                  Hand-picked selections from our latest publications
                </p>
              </div>
              <Link href="/book-store">
                <Button variant="outline" className="hidden md:flex">
                  View All
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <BookCarousel books={featuredBooks} />
          </div>
        </section>
      )}

      <main className="bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Welcome to Quillip Publications
          </h2>
          <p className="text-gray-500 mt-2 text-lg">Bringing Stories to Life</p>

          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-[#0b2647] mb-3">
              Our Services
            </h2>
            <p className="text-lg text-slate-600 pb-3">
              Discover our wide range of publishing and editorial services
              tailored to meet your needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Book Publishing",
                  desc: "Manuscript Editing and Proofreading | Book Design | Print and digital Publication.",
                  link: "/publish-book",
                },
                {
                  title: "Manual Publishing",
                  desc: "Manuscript Editing and Proofreading | Book Design | Print and digital Publication.",
                  link: "/publish-book",
                },
                {
                  title: "Chapter Publishing",
                  desc: "Peer-Reviewed | Gain an ISBN | Publication Certificate | Hard Copy | E-Book",
                  link: "/chapter-publishing",
                },
                {
                  title: "Conference Proceeding",
                  desc: "Extend the reach of your research through published conference papers.",
                  link: "/publish-book",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 text-center transition"
                >
                  <h3 className="font-bold text-lg text-[#0b2647] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-md text-slate-600 pb-2">{item.desc}</p>
                  <Link
                    href={item.link}
                    className="text-blue-600 font-semibold"
                  >
                    {" "}
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publication Process */}
        <section>
          <h2 className="text-3xl font-semibold text-[#0b2647] mb-3 text-center">
            Publication Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Publishing",
                desc: "We provide end-to-end publishing solutions, from editorial services to design and printing, ensuring your content reaches the world.",
              },
              {
                title: "Editing & Proofreading",
                desc: "Our team of experts ensures that your manuscript is polished to perfection, adhering to industry standards for grammar, style and consistency.",
              },
              {
                title: "Distribution",
                desc: "We handle the distribution of your work globally, making sure it's available in online bookstores, libraries and more.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg text-center"
              >
                <h3 className="font-bold text-lg text-[#0b2647] mb-2">
                  {step.title}
                </h3>
                <p className="text-md text-slate-600 pb-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
  
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side Image */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
              alt="Why Choose Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side Text */}
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-8">
              Why Choose Us
            </h2>
            <div className="space-y-6 text-slate-700">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Get Real-Time Sales Alert
                </h3>
                <p>
                  You don’t need to wait for months or hear back from the
                  publisher. You get complete control over your book’s
                  commercial timeline.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Fast Publication with Us
                </h3>
                <p>
                  Why wait a year to see your results? Get notified whenever
                  someone buys your book—anywhere in the world.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Earn More on Every Sale
                </h3>
                <p>
                  Don’t settle for minimal royalties or yearly payouts. Earn
                  maximum profits from your book sales with monthly payouts.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Real-Time Progress Tracking
                </h3>
                <p>
                  Know exactly where your book stands in the publishing process
                  and track every stage effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {allBooks.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">
                All Books
              </h2>
              <p className="text-lg text-slate-600">
                Explore our complete collection
              </p>
            </div>
            <BookCarousel books={allBooks} />
            <div className="text-center mt-12">
              <Link href="/book-store">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg h-12 px-8"
                >
                  Visit Complete Store
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Quality Publications</h3>
              <p className="text-blue-100 leading-relaxed">
                Curated collection of high-quality academic and professional
                books
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Expert Authors</h3>
              <p className="text-blue-100 leading-relaxed">
                Collaborate with renowned authors and scholars from around the
                world
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookMarked className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Easy Publishing</h3>
              <p className="text-blue-100 leading-relaxed">
                Streamlined process for authors to publish their books and
                chapters
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
