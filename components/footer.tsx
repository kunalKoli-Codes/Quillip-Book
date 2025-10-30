'use client';

import { BookMarked } from "lucide-react";
import Link from "next/link";

<footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <BookMarked className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Publication House</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your trusted partner in academic and professional publishing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book-store"
                    className="hover:text-white transition-colors"
                  >
                    Book Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/online-books"
                    className="hover:text-white transition-colors"
                  >
                    Online Books
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Publishing</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link
                    href="/publish-book"
                    className="hover:text-white transition-colors"
                  >
                    Publish Book
                  </Link>
                </li>
                <li>
                  <Link
                    href="/publish-chapter"
                    className="hover:text-white transition-colors"
                  >
                    Publish Chapter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Admin</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link
                    href="/login"
                    className="hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 Publication House. All rights reserved.</p>
          </div>
        </div>
      </footer>