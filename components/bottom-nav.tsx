'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/create', label: 'Create' },
  { href: '/bulk', label: 'Bulk' },
  { href: '/history', label: 'History' },
  { href: '/profile', label: 'Profile' }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto grid max-w-4xl grid-cols-4 gap-2 p-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'rounded-xl px-3 py-2 text-center text-sm text-slate-300 transition hover:bg-white/10 hover:text-white',
              pathname === link.href && 'bg-violet-500 text-white'
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
