import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingBag } from 'lucide-react';
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
  description?: string;
  selling_price: number;
  category: string;
  image_url?: string;
  image?: string;
  display_order?: number;
  product_variants?: Variant[];
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
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('display_order', { ascending: true, nullsFirst: false });

        if (error) {
          console.error('Error fetching products from Supabase:', error);
        } else if (data) {
          setProducts(data as Product[]);
        }
      } catch (err) {
        console.error('Unexpected fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = ['All Drops', 'Hoodies', 'Sweatshirts'];

  // Normalize and filter category lists safely
  let filtered = products.filter((p) => {
    if (activeCategory === 'All Drops') return true;
    if (!p.category) return false;

    const prodCat = p.category.toLowerCase().replace(/s$/, '').trim(); // Normalizes "Hoodies" vs "Hoodie"
    const targetCat = activeCategory.toLowerCase().replace(/s$/, '').trim();

    return prodCat.includes(targetCat) || targetCat.includes(prodCat);
  });

  // Apply Price Sorting
  if (sortBy === 'Price: Low to High') {
    filtered = [...filtered].sort((a, b) => (a.selling_price || 0) - (b.selling_price || 0));
  } else if (sortBy === 'Price: High to Low') {
    filtered = [...filtered].sort((a, b) => (b.selling_price || 0) - (a.selling_price || 0));
  }

  const handleCardClick = (product: Product) => {
    navigate('/product/' + product.id);
  };

  const handleAddToBagClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (onAddToBag) {
      onAddToBag(product);
      setAdded(product.id);
      setTimeout(() => setAdded(null), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 bg-black text-white font-mono text-xs tracking-widest uppercase">
        Loading Nyvor Catalog...
      </div>
    );
  }

  return (
    <section id="shop" className="relative py-12 lg:py-20 border-t border-neutral-900 bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-8">
        
        {/* Navigation Filters & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-neutral-900 pb-5">
          
          {/* Category Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all border whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative self-start md:self-auto">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider text-neutral-300 border border-neutral-800 bg-black hover:border-neutral-600 transition"
            >
              <span>Sort: {sortBy}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-neutral-950 border border-neutral-800 z-50 shadow-2xl">
                {['Featured', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setSortOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:bg-neutral-900 hover:text-white transition border-b border-neutral-900 last:border-0"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Grid Area: 2 Columns Parallel Layout */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-neutral-500 font-mono text-sm tracking-wider">
            No products in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product) => {
              const displayImage = product.image_url || product.image || '/placeholder.png';
              
              return (
                <div
                  key={product.id}
                  onClick={() => handleCardClick(product)}
                  className="group cursor-pointer flex flex-col bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Floating Add to Bag Icon */}
                    <button
                      onClick={(e) => handleAddToBagClick(e, product)}
                      className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 p-2 sm:p-2.5 bg-black/80 backdrop-blur-md text-white border border-neutral-700 hover:bg-white hover:text-black transition-colors"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    {added === product.id && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white text-black text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5">
                        ADDED
                      </div>
                    )}
                  </div>

                  {/* Text Details Box */}
                  <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between bg-black border-t border-neutral-900">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-500 block truncate">
                        {product.category || 'Luxury Streetwear'}
                      </span>
                      <h3 className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white group-hover:text-neutral-300 transition line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-neutral-900 pt-2.5">
                      <span className="text-xs sm:text-sm font-mono font-bold text-white">
                        ₹{product.selling_price ? product.selling_price.toLocaleString('en-IN') : 'N/A'}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400 group-hover:translate-x-1 transition-transform hidden xs:inline">
                        View &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
