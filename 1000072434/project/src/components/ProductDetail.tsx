import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check, ChevronDown, Truck, Ruler, ShoppingBag, Zap } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Variant {
  id: string;
  qikink_sku: string;
  color: string;
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category?: string;
  selling_price: number;
  image_url?: string;
  image?: string;
  imageUrl?: string;
  gallery_urls?: string[];
  qikink_sku?: string;
  product_variants: Variant[];
}

type Props = {
  onAddToBag: (product: any, size: string, quantity: number, variantSku?: string) => void;
};

export function ProductDetail({ onAddToBag }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  // Fetch live product, gallery URLs, qikink_sku, and variants from Supabase
  useEffect(() => {
    async function fetchProductDetails() {
      if (!id) return;
      setLoading(true);

      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          category,
          selling_price,
          image_url,
          image,
          "imageUrl",
          gallery_urls,
          qikink_sku,
          product_variants (
            id,
            qikink_sku,
            color,
            size,
            price
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching product details:', error);
      } else if (data) {
        setProduct(data as Product);

        // Auto-select initial color if available
        const variants = data.product_variants || [];
        if (variants.length > 0) {
          const defaultColor = variants[0].color;
          setSelectedColor(defaultColor);
        }
      }
      setLoading(false);
    }

    fetchProductDetails();
  }, [id]);

  // Dynamically update active variant based on chosen Color and Size
  useEffect(() => {
    if (product && product.product_variants && selectedColor && selectedSize) {
      const match = product.product_variants.find(
        (v) => v.color.toLowerCase() === selectedColor.toLowerCase() && v.size.toUpperCase() === selectedSize.toUpperCase()
      );
      setSelectedVariant(match || null);
    }
  }, [selectedColor, selectedSize, product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-base flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <p className="font-display text-2xl text-accent">Product not found</p>
        <Link to="/" className="text-sm text-brand hover:text-brand-soft transition-colors">
          Back to shop
        </Link>
      </div>
    );
  }

  // Construct complete gallery array combining primary image and secondary gallery_urls
  const mainImage = product.image_url || product.image || product.imageUrl || '';
  const secondaryImages = Array.isArray(product.gallery_urls) ? product.gallery_urls : [];
  const productImages = Array.from(new Set([mainImage, ...secondaryImages].filter(Boolean)));

  // Derive unique available colors & sizes
  const availableColors = Array.from(
    new Set((product.product_variants || []).map((v) => v.color))
  );
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const currentPrice = selectedVariant?.price || product.selling_price || 799;

  // Resolve active Qikink SKU (Variant level -> Product level -> Default Fallback)
  const activeQikinkSku = selectedVariant?.qikink_sku || product.qikink_sku || 'UOsMRnHs-Wh-M';

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      return false;
    }

    const itemToBag = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: mainImage,
      color: selectedColor,
      sku: activeQikinkSku,
      qikink_sku: activeQikinkSku,
    };

    onAddToBag(itemToBag as any, selectedSize, quantity, activeQikinkSku);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    return true;
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    const success = handleAddToBag();
    if (success) {
      // Small timeout ensures cart state propagates safely before routing to checkout
      setTimeout(() => {
        navigate('/checkout');
      }, 50);
    }
  };

  const accordions = [
    { 
      title: 'Fabric Specs & Quality', 
      content: 'Crafted from 220 GSM heavyweight 100% combed cotton. Features a regular fit, reinforced neckline, and high-density stitching built for a structured silhouette.' 
    },
    { 
      title: 'Care Instructions', 
      content: 'Machine wash cold inside-out with like colors. Do not bleach or tumble dry high. Cool iron on reverse side if needed. Do not iron directly on prints.' 
    },
    { 
      title: 'Qikink Fulfillment & Shipping', 
      content: 'Dispatched via Express Logistics within 24–48 hours. Tracking details sent automatically upon dispatch. Standard delivery timeline across India is 3–5 business days.' 
    },
  ];

  return (
    <div className="pt-20 bg-ink-base min-h-screen text-accent">
      {/* Breadcrumb / back */}
      <div className="mx-auto max-w-[1600px] px-5 lg:px-8 py-4 border-hairline-b">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-accent-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] border-hairline rounded-sm overflow-hidden bg-ink-overlay">
              <img
                src={productImages[activeImage] || mainImage}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
            </div>
            
            {/* Multi-Image Secondary Mockups Grid */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square border rounded-sm overflow-hidden transition-all duration-300 ${
                      activeImage === i ? 'border-brand ring-2 ring-brand/50 opacity-100 scale-105' : 'border-hairline opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info & Buy Controls */}
          <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-3">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase">
                {product.category || 'NYVOR UNISEX'}
              </p>
              <h1 className="font-display text-3xl lg:text-4xl tracking-ultra-tight text-accent leading-tight uppercase font-bold">
                {product.name}
              </h1>
              <p className="font-mono text-2xl text-accent font-semibold">
                ₹{currentPrice.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 border-hairline rounded-sm bg-ink-raised">
              <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs tracking-wide-label text-accent uppercase font-medium">
                220 GSM Heavyweight Cotton
              </span>
            </div>

            {/* Dynamic Colors from Supabase */}
            {availableColors.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs tracking-wide-label text-accent-dim uppercase">
                  Colour — <span className="text-accent font-semibold">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-all duration-300 ${
                        selectedColor === color
                          ? 'bg-accent text-ink-base border-accent font-bold'
                          : 'border-hairline text-accent hover:bg-ink-raised'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-wide-label text-accent-dim uppercase">
                  Select Size
                </p>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-accent-muted hover:text-brand transition-colors"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`py-3.5 text-sm font-medium rounded-sm border transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-accent text-ink-base border-accent font-bold scale-105'
                        : 'border-hairline text-accent hover:bg-ink-raised hover:border-line-strong'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-xs text-brand font-medium animate-pulse">
                  * Please select a size to proceed.
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase">
                Quantity
              </p>
              <div className="inline-flex items-center border-hairline rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-accent-muted hover:text-accent transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 text-sm text-accent font-mono font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-accent-muted hover:text-accent transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Bag & Buy Now */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToBag}
                className={`flex-1 py-4 text-sm font-semibold tracking-wide-label uppercase rounded-sm border transition-all duration-300 flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-success text-white border-success'
                    : 'bg-ink-raised border-hairline text-accent hover:bg-ink-overlay'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to Bag
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 text-sm font-semibold tracking-wide-label uppercase rounded-sm bg-accent text-ink-base hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Zap className="h-4 w-4 fill-current" /> Buy Now
              </button>
            </div>

            {/* Free shipping note */}
            <div className="flex items-center gap-2 text-xs text-accent-muted">
              <Truck className="h-4 w-4 text-brand" />
              Free Express Shipping across India on orders over ₹4,999
            </div>

            {/* Accordion */}
            <div className="border-hairline-t pt-6 space-y-px bg-line border-hairline rounded-sm overflow-hidden">
              {accordions.map((item, i) => (
                <div key={i} className="bg-ink-base">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-ink-raised transition-colors duration-300 group"
                  >
                    <span className="text-sm font-medium text-accent tracking-wide-label uppercase">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-accent-muted transition-transform duration-300 ${
                        openAccordion === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-400 ease-out ${
                      openAccordion === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-accent-muted leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Size guide modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setSizeGuideOpen(false)} />
          <div className="relative w-full max-w-lg bg-ink-base border-hairline rounded-sm p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl text-accent tracking-tight">SIZE GUIDE</h3>
              <button onClick={() => setSizeGuideOpen(false)} className="text-accent-muted hover:text-accent transition-colors">
                <ChevronDown className="h-5 w-5 rotate-180" />
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-hairline-b">
                  <th className="text-left py-3 text-xs tracking-wide-label text-accent-dim uppercase">Size</th>
                  <th className="text-right py-3 text-xs tracking-wide-label text-accent-dim uppercase">Chest (in)</th>
                  <th className="text-right py-3 text-xs tracking-wide-label text-accent-dim uppercase">Length (in)</th>
                  <th className="text-right py-3 text-xs tracking-wide-label text-accent-dim uppercase">Shoulder (in)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: 'S', chest: 40, length: 27, shoulder: 19 },
                  { size: 'M', chest: 42, length: 28, shoulder: 20 },
                  { size: 'L', chest: 44, length: 29, shoulder: 21 },
                  { size: 'XL', chest: 46, length: 30, shoulder: 22 },
                  { size: 'XXL', chest: 48, length: 31, shoulder: 23 },
                ].map((row) => (
                  <tr key={row.size} className="border-hairline-b">
                    <td className="py-3 text-accent font-medium">{row.size}</td>
                    <td className="py-3 text-right text-accent-muted font-mono">{row.chest}</td>
                    <td className="py-3 text-right text-accent-muted font-mono">{row.length}</td>
                    <td className="py-3 text-right text-accent-muted font-mono">{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-accent-dim leading-relaxed">
              All measurements are in inches and represent garment dimensions, not body measurements.
              NYVOR tees are engineered with a 220 GSM heavyweight regular fit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
