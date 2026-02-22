import * as React from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      {...props}
    />
  );
}
