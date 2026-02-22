'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import {
  PreviewCard,
  type BackgroundPreset,
  type BubbleStyle,
  type Mode,
  type Platform
} from '@/components/preview-card';
import { EditorTabs } from '@/components/editor-tabs';
import { useLocalStorageHistory } from '@/hooks/use-local-storage-history';
import { sanitizeFilenamePart } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';

const DEFAULTS = {
  platform: 'TikTok' as Platform,
  mode: 'Comment Reply' as Mode,
  username: 'username',
  comment: 'Write any comment and see what happens 😊',
  backgroundPreset: 'Neon Night' as BackgroundPreset,
  bubbleStyle: 'platform' as BubbleStyle
};

function makeProjectId() {
  return `${Date.now()}`;
}

export default function CreatePage() {
  const [platform, setPlatform] = useState<Platform>(DEFAULTS.platform);
  const [mode, setMode] = useState<Mode>(DEFAULTS.mode);
  const [username, setUsername] = useState(DEFAULTS.username);
  const [comment, setComment] = useState(DEFAULTS.comment);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [backgroundPreset, setBackgroundPreset] = useState<BackgroundPreset>(DEFAULTS.backgroundPreset);
  const [bubbleStyle, setBubbleStyle] = useState<BubbleStyle>(DEFAULTS.bubbleStyle);
  const [activeTab, setActiveTab] = useState('Comment');
  const [projectId, setProjectId] = useState(makeProjectId);
  const previewRef = useRef<HTMLDivElement>(null);
  const { saveProject, saveDraft, loadDraft, getProjectById } = useLocalStorageHistory();
  const { showToast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loadId = params.get('load');
    if (loadId) {
      const loaded = getProjectById(loadId);
      if (loaded) {
        setPlatform(loaded.platform);
        setMode(loaded.mode);
        setUsername(loaded.username);
        setComment(loaded.comment);
        setAvatarUrl(loaded.avatarUrl);
        setBackgroundPreset(loaded.backgroundPreset ?? DEFAULTS.backgroundPreset);
        setBubbleStyle(loaded.bubbleStyle ?? DEFAULTS.bubbleStyle);
        setProjectId(loaded.id);
        showToast('Loaded project from history');
      }
      window.history.replaceState({}, '', '/create');
      return;
    }

    const draft = loadDraft();
    if (draft) {
      setPlatform(draft.platform);
      setMode(draft.mode);
      setUsername(draft.username);
      setComment(draft.comment);
      setAvatarUrl(draft.avatarUrl);
      setBackgroundPreset(draft.backgroundPreset ?? DEFAULTS.backgroundPreset);
      setBubbleStyle(draft.bubbleStyle ?? DEFAULTS.bubbleStyle);
      setProjectId(draft.id);
    }
  }, [getProjectById, loadDraft, showToast]);

  const projectSnapshot = useMemo(
    () => ({
      id: projectId,
      platform,
      mode,
      username,
      comment,
      avatarUrl,
      backgroundPreset,
      bubbleStyle,
      timestamp: Date.now()
    }),
    [avatarUrl, backgroundPreset, bubbleStyle, comment, mode, platform, projectId, username]
  );

  useEffect(() => {
    saveDraft(projectSnapshot);
  }, [projectSnapshot, saveDraft]);

  async function handleDownload() {
    if (!previewRef.current) {
      showToast('Preview not ready yet');
      return;
    }

    try {
      const dataUrl = await toPng(previewRef.current, { pixelRatio: 2, cacheBust: true, backgroundColor: '#09090b' });
      const link = document.createElement('a');
      const date = new Date().toISOString().slice(0, 10);
      const fileName = `${sanitizeFilenamePart(platform)}_${sanitizeFilenamePart(mode)}_${sanitizeFilenamePart(username)}_${date}.png`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();
      showToast('Downloaded PNG');
    } catch {
      showToast('Download failed. Try again.');
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(comment);
      showToast('Copied!');
    } catch {
      showToast('Clipboard blocked by browser');
    }
  }

  function handleSaveToHistory() {
    saveProject(projectSnapshot);
    showToast('Saved to history');
  }

  function handleNewProject() {
    setPlatform(DEFAULTS.platform);
    setMode(DEFAULTS.mode);
    setUsername(DEFAULTS.username);
    setComment(DEFAULTS.comment);
    setAvatarUrl(undefined);
    setBackgroundPreset(DEFAULTS.backgroundPreset);
    setBubbleStyle(DEFAULTS.bubbleStyle);
    setActiveTab('Comment');
    setProjectId(makeProjectId());
    showToast('New project ready');
  }

  function handleAvatarFileChange(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(typeof reader.result === 'string' ? reader.result : undefined);
      showToast('Avatar updated');
    };
    reader.onerror = () => {
      showToast('Could not read selected file');
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6">
      <section className="mx-auto max-w-3xl space-y-4">
        <div ref={previewRef}>
          <PreviewCard
            username={username}
            comment={comment}
            mode={mode}
            platform={platform}
            avatarUrl={avatarUrl}
            backgroundPreset={backgroundPreset}
            bubbleStyle={bubbleStyle}
          />
        </div>

        <EditorTabs
          platform={platform}
          mode={mode}
          username={username}
          comment={comment}
          activeTab={activeTab}
          backgroundPreset={backgroundPreset}
          bubbleStyle={bubbleStyle}
          onActiveTabChange={setActiveTab}
          onPlatformChange={setPlatform}
          onModeChange={setMode}
          onUsernameChange={setUsername}
          onCommentChange={setComment}
          onBackgroundPresetChange={setBackgroundPreset}
          onBubbleStyleChange={setBubbleStyle}
          onAvatarFileChange={handleAvatarFileChange}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <Button className="h-12 text-base" onClick={handleDownload}>
            Download Comment
          </Button>
          <Button className="h-12 text-base" variant="outline" onClick={handleCopy}>
            Copy
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button className="h-11" variant="outline" onClick={handleSaveToHistory}>
            Save to History
          </Button>
          <Button className="h-11" variant="ghost" onClick={handleNewProject}>
            New project
          </Button>
        </div>
      </section>
    </div>
  );
}
