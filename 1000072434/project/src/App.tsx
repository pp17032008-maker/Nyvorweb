import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { BrandStoryAccordion } from '@/components/Sections';
import { Footer } from '@/components/Footer';
import { CartDrawer, type CartItem } from '@/components/CartDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { ProductDetail } from '@/components/ProductDetail';
import { ContactPage } from '@/components/ContactPage';
import { AboutPage } from '@/components/AboutPage';
import { CheckoutPage } from '@/components/CheckoutPage';
import type { Product } from '@/data/products';

function AppContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();

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

  // Robust handleAddToBag with safety normalization to prevent crashes
  const handleAddToBag = useCallback((productInput: any, size: string, quantity: number) => {
    setCartItems((prev) => {
      const normalizedProduct = {
        id: productInput.id || productInput.product?.id || 'unknown-id',
        name: productInput.name || productInput.product?.name || 'NYVOR Apparel',
        selling_price: productInput.selling_price || productInput.price || productInput.product?.selling_price || productInput.product?.price || 799,
        image_url: productInput.image_url || productInput.image || productInput.imageUrl || productInput.product?.image_url || productInput.product?.image || '',
        color: productInput.color || productInput.product?.color || '',
        qikink_sku: productInput.qikink_sku || productInput.sku || productInput.product?.qikink_sku || '',
      };

      const existingIndex = prev.findIndex(
        (item) => item.product.id === normalizedProduct.id && item.size === size && (item.product as any).color === normalizedProduct.color
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product: normalizedProduct as Product, size, quantity }];
    });
  }, []);

  const handleQuickAdd = useCallback((product: Product) => {
    const defaultSize = 'M';
    handleAddToBag(product, defaultSize, 1);
  }, [handleAddToBag]);

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
                <BrandStoryAccordion />
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
            element={<BrandStoryAccordion />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="/about"
            element={<AboutPage />}
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                onClearCart={() => setCartItems([])}
              />
            }
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
