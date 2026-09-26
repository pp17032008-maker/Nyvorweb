import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Check, ChevronDown } from 'lucide-react';
import { products, categories, sortOptions, type Category, type Product } from '@/data/products';

type Props = {
  onAddToBag: (product: Product) => void;
};

export function ProductGrid({ onAddToBag }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All Drops');
  const [sortBy, setSortBy] = useState<string>('Featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [added, setAdded] = useState<string | null>(null);
  const navigate = useNavigate();

  let filtered = activeCategory === 'All Drops'
    ? products
    : products.filter((p) => p.category === activeCategory);

  if (sortBy === 'Price: Low to High') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const handleAdd = (product: Product) => {
    onAddToBag(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const handleCardClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <section id="shop" className="relative py-20 lg:py-28 border-hairline-t">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <p className="text-xs tracking-wide-label text-brand uppercase">
              The Collection
            </p>
            <h2 className="font-display text-3xl lg:text-5xl tracking-ultra-tight text-accent">
THE COLLECTION
            </h2>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-5 py-2.5 border-hairline text-sm text-accent hover:bg-ink-raised rounded-sm transition-all duration-300"
            >
              <span className="text-accent-muted">Sort:</span>
              {sortBy}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-ink-raised border-hairline rounded-sm p-2 z-20 animate-fade-in">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm rounded-sm transition-colors ${
                      sortBy === option
                        ? 'text-brand bg-ink-overlay'
                        : 'text-accent-muted hover:text-accent hover:bg-ink-overlay'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category filter bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-10 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs tracking-wide-label uppercase whitespace-nowrap rounded-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-ink-base'
                  : 'text-accent-muted hover:text-accent border-hairline hover:bg-ink-raised'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border-hairline rounded-sm overflow-hidden">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-ink-base hover:bg-ink-raised transition-colors duration-500 cursor-pointer"
              onClick={() => handleCardClick(product)}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-overlay">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-base/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tag */}
                {product.tag && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-ink-base/80 backdrop-blur-sm border-hairline text-[10px] tracking-wide-label text-brand uppercase rounded-sm">
                    {product.tag}
                  </div>
                )}

                {/* Quick add */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdd(product);
                  }}
                  className={`absolute bottom-3 left-3 right-3 py-3 text-xs tracking-wide-label uppercase font-semibold rounded-sm transition-all duration-500 ${
                    added === product.id
                      ? 'bg-success text-white translate-y-0 opacity-100'
                      : 'bg-accent text-ink-base translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                  }`}
                >
                  {added === product.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4" /> Added
                    </span>
                  ) : (
                    'Add to Bag'
                  )}
                </button>
              </div>

              {/* Info */}
              <div className="p-4 lg:p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <p className="text-[10px] tracking-wide-label text-accent-dim uppercase">
                      {product.category}
                    </p>
                    <h3 className="text-sm text-accent truncate font-medium">
                      {product.name}
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-accent whitespace-nowrap">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      title={color.name}
                      className="h-4 w-4 rounded-full border-hairline hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                  <span className="text-[10px] text-accent-dim ml-1">
                    {product.colors.length} {product.colors.length === 1 ? 'colour' : 'colours'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-accent-muted">No products in this category yet.</p>
          </div>
        )}

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="group flex items-center gap-2 px-8 py-4 border-hairline text-sm tracking-wide-label uppercase text-accent hover:bg-ink-raised transition-all duration-300 rounded-sm"
          >
            View All Products
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
          </a>
        </div>
      </div>
    </section>
  );
}
