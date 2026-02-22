import { cn } from '@/lib/utils';

type TabsProps = {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
};

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-white/5 p-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            'rounded-xl px-3 py-2 text-xs font-medium transition md:text-sm',
            activeTab === tab ? 'bg-violet-500 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
