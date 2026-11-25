import { useState } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const trending = ['Heavyweight Tee', 'Shadow Hoodie', 'Technical Jacket', 'Raw Denim'];
const suggestions = ['Tees', 'Hoodies', 'Jackets', 'Denim', 'Drop 01'];

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in" onClick={onClose} />
      <div className="absolute top-0 left-0 right-0 bg-ink-base border-hairline-b animate-fade-in">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg text-accent tracking-tight">SEARCH</h3>
            <button onClick={onClose} className="p-2 text-accent-muted hover:text-accent transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-accent-dim" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, categories, drops..."
              className="w-full pl-10 pr-4 py-4 bg-transparent text-2xl lg:text-4xl font-display tracking-tight text-accent placeholder:text-accent-dim focus:outline-none border-b border-transparent focus:border-brand/40 transition-colors"
            />
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase">Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-4 py-2 border-hairline text-sm text-accent-muted hover:text-accent hover:bg-ink-raised rounded-sm transition-all duration-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3 text-brand" /> Trending
              </p>
              <div className="space-y-1">
                {trending.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="block w-full text-left py-2 text-sm text-accent-muted hover:text-accent transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
