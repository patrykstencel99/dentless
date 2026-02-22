'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Mode = 'Comment Reply' | 'Comment';
export type Platform = 'TikTok' | 'Instagram' | 'YouTube' | 'X';
export type BackgroundPreset = 'Neon Night' | 'Deep Space' | 'Sunset Pulse';
export type BubbleStyle = 'platform' | 'soft' | 'glass';

type PreviewCardProps = {
  username: string;
  comment: string;
  mode: Mode;
  platform: Platform;
  avatarUrl?: string;
  backgroundPreset: BackgroundPreset;
  bubbleStyle: BubbleStyle;
};

const bgClassMap: Record<BackgroundPreset, string> = {
  'Neon Night': 'from-slate-900 via-indigo-950 to-black',
  'Deep Space': 'from-[#090b1a] via-[#141b3a] to-[#040508]',
  'Sunset Pulse': 'from-[#26121a] via-[#441a3b] to-[#0f1022]'
};

export function PreviewCard({
  username,
  comment,
  mode,
  platform,
  avatarUrl,
  backgroundPreset,
  bubbleStyle
}: PreviewCardProps) {
  const platformTone = platform === 'Instagram' ? 'text-fuchsia-200/90' : 'text-slate-200/90';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-white/10 p-6 shadow-[0_0_120px_rgba(109,40,217,0.24)] transition-all duration-300',
        'bg-gradient-to-br',
        bgClassMap[backgroundPreset]
      )}
    >
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-2xl" />
      <div className="absolute -bottom-12 right-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
      <div
        className={cn(
          'relative flex items-start gap-4 rounded-2xl border p-5 backdrop-blur transition-all duration-300',
          bubbleStyle === 'platform' && 'border-white/15 bg-black/35',
          bubbleStyle === 'soft' && 'border-white/10 bg-white/10',
          bubbleStyle === 'glass' && 'border-cyan-300/20 bg-cyan-100/10'
        )}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 text-slate-950">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <MessageCircle size={20} />
          )}
        </div>
        <div className="space-y-3">
          {mode === 'Comment Reply' && (
            <p className={cn('text-xs uppercase tracking-wide', platformTone)}>
              Reply to {username}&apos;s comment
            </p>
          )}
          <p className="text-lg font-semibold leading-relaxed text-white md:text-xl">{comment}</p>
        </div>
      </div>
    </div>
  );
}
