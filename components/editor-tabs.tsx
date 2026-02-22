'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Tabs } from '@/components/ui/tabs';
import type { BackgroundPreset, BubbleStyle, Mode, Platform } from '@/components/preview-card';

type EditorTabsProps = {
  platform: Platform;
  mode: Mode;
  username: string;
  comment: string;
  activeTab: string;
  backgroundPreset: BackgroundPreset;
  bubbleStyle: BubbleStyle;
  onActiveTabChange: (tab: string) => void;
  onPlatformChange: (value: Platform) => void;
  onModeChange: (value: Mode) => void;
  onUsernameChange: (value: string) => void;
  onCommentChange: (value: string) => void;
  onBackgroundPresetChange: (value: BackgroundPreset) => void;
  onBubbleStyleChange: (value: BubbleStyle) => void;
  onAvatarFileChange: (file: File | null) => void;
};

export function EditorTabs(props: EditorTabsProps) {
  const {
    platform,
    mode,
    username,
    comment,
    activeTab,
    backgroundPreset,
    bubbleStyle,
    onActiveTabChange,
    onPlatformChange,
    onModeChange,
    onUsernameChange,
    onCommentChange,
    onBackgroundPresetChange,
    onBubbleStyleChange,
    onAvatarFileChange
  } = props;

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Platform</span>
          <Select value={platform} onChange={(e) => onPlatformChange(e.target.value as Platform)}>
            <option>TikTok</option>
            <option>Instagram</option>
            <option>YouTube</option>
            <option>X</option>
          </Select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Mode</span>
          <Select value={mode} onChange={(e) => onModeChange(e.target.value as Mode)}>
            <option>Comment Reply</option>
            <option>Comment</option>
          </Select>
        </label>
      </div>

      <Tabs tabs={['Comment', 'Engagement', 'Advanced Edit']} activeTab={activeTab} onChange={onActiveTabChange} />

      {activeTab === 'Comment' && (
        <div className="space-y-4">
          <label className="space-y-2 text-sm">
            <span className="text-slate-300">Username</span>
            <Input
              value={username}
              onChange={(e) => onUsernameChange(e.target.value.slice(0, 30))}
              maxLength={30}
              placeholder="username"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-slate-300">Comment</span>
            <div className="relative">
              <Textarea
                value={comment}
                maxLength={280}
                onChange={(e) => onCommentChange(e.target.value.slice(0, 280))}
                placeholder="Write any comment and see what happens 😊"
              />
              <span className="absolute bottom-2 right-3 text-xs text-slate-400">{comment.length}/280</span>
            </div>
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-slate-300">Avatar usera (opcjonalnie)</span>
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => onAvatarFileChange(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      )}

      {activeTab === 'Engagement' && (
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-300">
            Likes
            <Input type="number" defaultValue={1280} />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Replies
            <Input type="number" defaultValue={43} />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Time label
            <Input defaultValue="2h" />
          </label>
        </div>
      )}

      {activeTab === 'Advanced Edit' && (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            Tło
            <Select value={backgroundPreset} onChange={(e) => onBackgroundPresetChange(e.target.value as BackgroundPreset)}>
              <option>Neon Night</option>
              <option>Deep Space</option>
              <option>Sunset Pulse</option>
            </Select>
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Styl bańki
            <Select value={bubbleStyle} onChange={(e) => onBubbleStyleChange(e.target.value as BubbleStyle)}>
              <option value="platform">Platform</option>
              <option value="soft">Soft</option>
              <option value="glass">Glass</option>
            </Select>
          </label>
        </div>
      )}
    </div>
  );
}
