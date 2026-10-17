import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Check, ChevronDown } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Variant {
  id: string;
  color: string;
  size: string;
  qikink_sku: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  selling_price: number;
  category: string;
  product_variants: Variant[];
}

type Props = {
  onAddToBag?: (product: any) => void;
};

export function ProductGrid({ onAddToBag }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All Drops');
  const [sortBy, setSortBy] = useState<string>('Featured');
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [added, setAdded] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          selling_price,
          category,
          product_variants (
            id,
            color,
            size,
            qikink_sku
          )
        `);

      if (error) {
        console.error('Error fetching products from Supabase:', error);
      } else if (data) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const categories = ['All Drops', 'Hoodies', 'Sweatshirts'];

  let filtered = activeCategory === 'All Drops' 
    ? products 
    : products.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());

  if (sortBy === 'Price: Low to High') {
    filtered = [...filtered].sort((a, b) => a.selling_price - b.selling_price);
  } else if (sortBy === 'Price: High to Low') {
    filtered = [...filtered].sort((a, b) => b.selling_price - a.selling_price);
  }

  const handleCardClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  if (loading) {
    return <div className="text-center py-20 text-white bg-black">Loading Nyvor Catalog...</div>;
  }

  return (
    <section id="shop" className="relative py-20 lg:py-28 border-hairline-t bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <p className="text-xs tracking-wide-label text-brand uppercase">The Collection</p>
            <h2 className="font-display text-3xl lg:text-5xl tracking-ultra-tight text-accent">THE COLLECTION</h2>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-5 py-2.5 border-hairline text-sm text-accent rounded-sm"
            >
              <span className="text-accent-muted">Sort:</span> {sortBy}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-sm shadow-xl z-50">
                {['Featured', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === option ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
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
              className={`px-5 py-2.5 text-xs tracking-wide-label uppercase whitespace-nowrap rounded-sm transition-colors ${
                activeCategory === cat ? 'bg-white text-black font-bold' : 'text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-neutral-900/50">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => handleCardClick(product)}
              className="group bg-neutral-900 hover:bg-neutral-800/80 transition-colors duration-300 cursor-pointer p-4 rounded flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-800 rounded mb-4 flex items-center justify-center">
                  <span className="text-neutral-500 text-xs uppercase tracking-wider">Nyvor Drop</span>
                </div>
                <p className="text-[10px] tracking-wide-label text-neutral-400 uppercase">{product.category}</p>
                <h3 className="text-sm text-white truncate font-medium mt-1">{product.name}</h3>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-sm text-white">₹{product.selling_price?.toLocaleString('en-IN')}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddToBag) onAddToBag(product);
                    setAdded(product.id);
                    setTimeout(() => setAdded(null), 1500);
                  }}
                  className="px-3 py-1.5 bg-white text-black text-xs font-medium rounded hover:bg-neutral-200 transition-colors"
                >
                  {added === product.id ? 'Added!' : 'View Options'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-neutral-400">No products in this category yet.</p>
          </div>
        )}

      </div>
    </section>
  );
}
