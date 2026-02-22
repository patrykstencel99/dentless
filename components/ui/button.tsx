import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost';
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'default' && 'bg-violet-500 text-white hover:bg-violet-400',
        variant === 'outline' && 'border border-border bg-white/5 text-foreground hover:bg-white/10',
        variant === 'ghost' && 'text-slate-300 hover:bg-white/10 hover:text-white',
        className
      )}
      {...props}
    />
  );
}
