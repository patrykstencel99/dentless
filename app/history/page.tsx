'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocalStorageHistory, type ProjectRecord } from '@/hooks/use-local-storage-history';
import { useToast } from '@/components/ui/toast';

export default function HistoryPage() {
  const [items, setItems] = useState<ProjectRecord[]>([]);
  const { getHistory, deleteProject, clearHistory } = useLocalStorageHistory();
  const { showToast } = useToast();

  useEffect(() => {
    setItems(getHistory());
  }, [getHistory]);

  function refresh() {
    setItems(getHistory());
  }

  function handleDelete(id: string) {
    deleteProject(id);
    refresh();
    showToast('Project removed');
  }

  function handleClearAll() {
    clearHistory();
    refresh();
    showToast('History cleared');
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-slate-300">Last 20 saved projects from localStorage.</p>
        </div>
        <Button variant="outline" onClick={handleClearAll}>
          Clear all
        </Button>
      </div>
      {items.length === 0 && <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-300">No projects yet.</p>}
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400">{new Date(item.timestamp).toLocaleString()}</p>
            <p className="mt-1 text-sm text-violet-200">
              {item.platform} · {item.mode}
            </p>
            <h2 className="mt-2 font-semibold">@{item.username}</h2>
            <p className="mt-1 line-clamp-2 text-slate-200">{item.comment}</p>
            <div className="mt-3 flex gap-2">
              <Link href={`/create?load=${item.id}`}>
                <Button variant="outline">Load</Button>
              </Link>
              <Button variant="ghost" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
