import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { BrandStory } from '@/components/BrandStory';
import { Footer } from '@/components/Footer';
import { CartDrawer, type CartItem } from '@/components/CartDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { ProductDetail } from '@/components/ProductDetail';
import { ContactPage } from '@/components/ContactPage';
import { AboutPage } from '@/components/AboutPage';
import { BrandExperience } from '@/components/BrandExperience';
import type { Product } from '@/data/products';

function AppContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
async function loadProducts() {
const { data, error } = await supabase.from('products').select('*');
if (error) {
console.error('Error fetching Nyvor products:', error);
} else if (data) {
setProducts(data);
}
setLoading(false);
}

loadProducts();

}, []);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToBag = useCallback((product: Product, size: string, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
  }, []);

  const handleQuickAdd = useCallback((product: Product) => {
    const defaultSize = 'M';
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === defaultSize
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, size: defaultSize, quantity: 1 }];
    });
  }, []);

  const handleUpdateQty = useCallback((index: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item, i) =>
          i === index
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemove = useCallback((index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="min-h-screen bg-ink-base text-accent">
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ProductGrid onAddToBag={handleQuickAdd} />
                <BrandStory />
                <BrandExperience />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToBag={handleAddToBag} />}
          />
          <Route
            path="/shop"
            element={<ProductGrid onAddToBag={handleQuickAdd} />}
          />
          <Route
            path="/drops"
            element={<ProductGrid onAddToBag={handleQuickAdd} />}
          />
          <Route
            path="/brand-story"
            element={<BrandStory />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="/about"
            element={<AboutPage />}
          />
        </Routes>
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
