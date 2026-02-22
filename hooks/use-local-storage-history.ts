'use client';

import { useCallback } from 'react';
import type { BackgroundPreset, BubbleStyle, Mode, Platform } from '@/components/preview-card';

export type ProjectRecord = {
  id: string;
  platform: Platform;
  mode: Mode;
  username: string;
  comment: string;
  avatarUrl?: string;
  backgroundPreset?: BackgroundPreset;
  bubbleStyle?: BubbleStyle;
  timestamp: number;
};

const HISTORY_KEY = 'commentsnap-history-v1';
const DRAFT_KEY = 'commentsnap-draft-v1';

export function useLocalStorageHistory() {
  const getHistory = useCallback((): ProjectRecord[] => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as ProjectRecord[];
    } catch {
      return [];
    }
  }, []);

  const saveProject = useCallback(
    (project: ProjectRecord) => {
      if (typeof window === 'undefined') return;
      const existing = getHistory().filter((item) => item.id !== project.id);
      const next = [project, ...existing].slice(0, 20);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    },
    [getHistory]
  );

  const deleteProject = useCallback(
    (id: string) => {
      if (typeof window === 'undefined') return;
      const next = getHistory().filter((item) => item.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    },
    [getHistory]
  );

  const clearHistory = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  }, []);

  const saveDraft = useCallback((project: ProjectRecord) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(project));
  }, []);

  const loadDraft = useCallback((): ProjectRecord | null => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as ProjectRecord;
    } catch {
      return null;
    }
  }, []);

  const getProjectById = useCallback(
    (id: string): ProjectRecord | null => {
      return getHistory().find((item) => item.id === id) ?? null;
    },
    [getHistory]
  );

  return { getHistory, saveProject, deleteProject, clearHistory, saveDraft, loadDraft, getProjectById };
}
