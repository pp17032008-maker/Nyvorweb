import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Heart } from 'lucide-react';
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
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
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

  let filtered = products.filter((p) => {
    if (activeCategory === 'All Drops') return true;
    if (!p.category) return false;

    const prodCat = p.category.toLowerCase().replace(/s$/, '').trim();
    const targetCat = activeCategory.toLowerCase().replace(/s$/, '').trim();

    return prodCat.includes(targetCat) || targetCat.includes(prodCat);
  });

  if (sortBy === 'Price: Low to High') {
    filtered = [...filtered].sort((a, b) => (a.selling_price || 0) - (b.selling_price || 0));
  } else if (sortBy === 'Price: High to Low') {
    filtered = [...filtered].sort((a, b) => (b.selling_price || 0) - (a.selling_price || 0));
  }

  const handleCardClick = (product: Product) => {
    navigate('/product/' + product.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setSavedIds((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 bg-[#0F0F11] text-[#D4AF37] font-mono text-xs tracking-[0.22em] uppercase">
        Loading NYVOR Catalog...
      </div>
    );
  }

  return (
    <section id="shop" className="relative py-16 lg:py-24 bg-[#0F0F11] text-[#F5F5F5]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* Centered Maison Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-[#D4AF37]">
            MAISON NYVOR ARCHIVE
          </p>
          <h2 className="mt-2 font-sans font-normal text-2xl sm:text-3xl tracking-[-0.02em] text-[#F5F5F5]">
            {activeCategory === 'All Drops' ? 'Signature Creations' : activeCategory}
          </h2>
        </div>

        {/* Clean Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-5 border-b border-[#222227]">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] transition-all whitespace-nowrap border ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-[#0F0F11] border-[#D4AF37]'
                    : 'bg-[#0F0F11] text-[#B4B4BE] border-[#2A2A32] hover:border-[#D4AF37] hover:text-[#F5F5F5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#8A8A94]">
              {filtered.length} {filtered.length === 1 ? 'PIECE' : 'PIECES'}
            </span>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-[0.14em] text-[#F5F5F5] border border-[#2A2A32] bg-[#151519] hover:border-[#D4AF37] transition"
              >
                <span>Sort: {sortBy}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#D4AF37] transition-transform ${
                    sortOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#151519] border border-[#2A2A32] z-50 overflow-hidden shadow-2xl">
                  {['Featured', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setSortOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-xs font-mono uppercase tracking-[0.14em] text-[#D4D4DC] hover:bg-[#1E1E24] hover:text-[#D4AF37] transition border-b border-[#222227] last:border-0"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LV-Inspired Clean Product Grid on #0F0F11 */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#8A8A94] font-mono text-xs uppercase tracking-[0.2em]">
            No creations in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {filtered.map((product) => {
              const displayImage = product.image_url || product.image || '/placeholder.png';
              const isSaved = !!savedIds[product.id];

              return (
                <article
                  key={product.id}
                  onClick={() => handleCardClick(product)}
                  className="group cursor-pointer flex flex-col bg-[#0F0F11]"
                >
                  {/* Clean Portrait Frame with Top-Right Wishlist Icon */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#16161B]">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    <button
                      type="button"
                      onClick={(e) => handleToggleWishlist(e, product.id)}
                      aria-label={`Save ${product.name}`}
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#0F0F11]/55 backdrop-blur-xs text-[#F5F5F5] hover:text-[#D4AF37] transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-[#D4AF37] text-[#D4AF37]' : 'stroke-[1.6]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Clean Name & Price Directly Below Image */}
                  <div className="pt-3.5 bg-[#0F0F11] space-y-1">
                    <h3 className="text-xs sm:text-sm font-normal tracking-[0.02em] text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#B4B4BE]">
                      {product.selling_price
                        ? `₹${product.selling_price.toLocaleString('en-IN')}.00`
                        : 'Price on Request'}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Centered Luxury Pill CTA Below Grid */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All Drops');
              setSortBy('Featured');
              const el = document.getElementById('shop');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full border border-[#32323B] text-xs font-medium tracking-[0.16em] text-[#F5F5F5] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
          >
            Discover All Creations
          </button>
        </div>
      </div>
    </section>
  );
}
