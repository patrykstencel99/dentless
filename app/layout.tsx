import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { BottomNav } from '@/components/bottom-nav';
import { Button } from '@/components/ui/button';
import { ToastProvider } from '@/components/ui/toast';

export const metadata: Metadata = {
  title: 'CommentSnap',
  description: 'Generator obrazka komentarza social media'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <ToastProvider>
          <header className="border-b border-white/10 bg-black/30 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
              <Link href="/create" className="text-xl font-black tracking-tight text-white">
                CommentSnap
              </Link>
              <div className="flex gap-2">
                <Button variant="ghost">Login</Button>
                <Button>Get Started</Button>
              </div>
            </div>
          </header>
          <div className="border-b border-violet-500/20 bg-violet-500/10 py-2 text-center text-sm text-violet-100">
            NEW: Create social-ready comment visuals in seconds. No account required.
          </div>
          <main className="mx-auto max-w-5xl px-4 pb-24 pt-6">{children}</main>
          <BottomNav />
        </ToastProvider>
      </body>
    </html>
  );
}
