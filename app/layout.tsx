import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/components/footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Publication House - Books & Authors',
  description: 'Professional publication house for books and authors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
        
      </body>
    </html>
  );
}
