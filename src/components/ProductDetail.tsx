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

  // Fetch live product and variants safely using independent queries
  useEffect(() => {
    async function fetchProductDetails() {
      if (!id) return;
      setLoading(true);

      // 1. Fetch main product data
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (productError) {
        console.error('Error fetching product details:', productError);
        setLoading(false);
        return;
      }

      if (productData) {
        // 2. Fetch variants separately to prevent schema join errors
        const { data: variantsData } = await supabase
          .from('product_variants')
          .select('*')
          .eq('product_id', id);

        const variants = variantsData || [];
        setProduct({
          ...productData,
          product_variants: variants,
        } as Product);

        // Auto-select initial color if available
        if (variants.length > 0) {
          setSelectedColor(variants[0].color);
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
        (v) =>
          v.color?.toLowerCase() === selectedColor.toLowerCase() &&
          v.size?.toUpperCase() === selectedSize.toUpperCase()
      );
      setSelectedVariant(match || null);
    }
  }, [selectedColor, selectedSize, product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0A0A0A]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col items-center justify-center gap-4 pt-20 px-4 text-center">
        <p className="font-display font-extrabold text-2xl text-[#0A0A0A] uppercase">Product not found</p>
        <p className="text-xs text-[#666666] max-w-md">
          The product ID in the URL may be invalid or the product has been removed.
        </p>
        <Link
          to="/"
          className="mt-2 px-6 py-3 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#222222] transition-colors"
        >
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
    new Set((product.product_variants || []).map((v) => v.color).filter(Boolean))
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
      setTimeout(() => {
        navigate('/checkout');
      }, 50);
    }
  };

  const accordions = [
    {
      title: 'Fabric Specs & Quality',
      content:
        'Crafted from 220 GSM heavyweight 100% combed cotton. Features a regular fit, reinforced neckline, and high-density stitching built for a structured silhouette.',
    },
    {
      title: 'Care Instructions',
      content:
        'Machine wash cold inside-out with like colors. Do not bleach or tumble dry high. Cool iron on reverse side if needed. Do not iron directly on prints.',
    },
    {
      title: 'Qikink Fulfillment & Shipping',
      content:
        'Dispatched via Express Logistics within 24–48 hours. Tracking details sent automatically upon dispatch. Standard delivery timeline across India is 3–5 business days.',
    },
  ];

  return (
    <div className="pt-10 bg-white min-h-screen text-[#0A0A0A]">
      {/* Breadcrumb / back */}
      <div className="mx-auto max-w-[1600px] px-5 lg:px-8 py-4 border-b border-[#E5E5E5]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#555555] hover:text-[#0A0A0A] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] border border-[#E5E5E5] overflow-hidden bg-[#FAFAFA]">
              <img
                src={productImages[activeImage] || mainImage}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
            </div>

            {productImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square border overflow-hidden transition-all duration-300 ${
                      activeImage === i
                        ? 'border-[#0A0A0A] ring-1 ring-[#0A0A0A] opacity-100'
                        : 'border-[#E5E5E5] opacity-65 hover:opacity-100 hover:border-[#0A0A0A]'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info & Buy Controls */}
          <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-3 border-b border-[#E5E5E5] pb-6">
              <p className="font-mono text-[11px] tracking-[0.22em] text-[#777777] uppercase">
                {product.category || 'NYVOR UNISEX'}
              </p>
              <h1 className="font-display text-3xl lg:text-4xl tracking-[-0.03em] text-[#0A0A0A] leading-tight uppercase font-extrabold">
                {product.name}
              </h1>
              <p className="font-mono text-2xl text-[#0A0A0A] font-bold">
                ₹{currentPrice.toLocaleString('en-IN')}
              </p>
              {product.description && (
                <p className="text-sm text-[#555555] leading-relaxed pt-1">
                  {product.description}
                </p>
              )}
            </div>

            {/* Quality Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 border border-[#E5E5E5] bg-[#FAFAFA]">
              <div className="h-2 w-2 rounded-full bg-[#0A0A0A]" />
              <span className="font-mono text-[11px] tracking-[0.18em] text-[#0A0A0A] uppercase font-medium">
                220 GSM Heavyweight Cotton
              </span>
            </div>

            {/* Dynamic Colors from Supabase */}
            {availableColors.length > 0 && (
              <div className="space-y-3">
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#666666] uppercase">
                  Colour — <span className="text-[#0A0A0A] font-semibold">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] border transition-all duration-300 ${
                        selectedColor === color
                          ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] font-semibold'
                          : 'border-[#E5E5E5] bg-white text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#FAFAFA]'
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
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#666666] uppercase">
                  Select Size
                </p>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] text-[#555555] hover:text-[#0A0A0A] transition-colors"
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
                    className={`py-3.5 text-sm font-mono font-medium border transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] font-bold'
                        : 'border-[#E5E5E5] bg-white text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#FAFAFA]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-xs font-mono text-[#0A0A0A] bg-[#FAFAFA] border border-[#0A0A0A] px-3 py-2">
                  * Please select a size to proceed.
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#666666] uppercase">
                Quantity
              </p>
              <div className="inline-flex items-center border border-[#E5E5E5] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#555555] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 text-sm text-[#0A0A0A] font-mono font-semibold border-l border-r border-[#E5E5E5] py-3">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#555555] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToBag}
                className={`flex-1 py-4 text-xs font-semibold tracking-[0.18em] uppercase border transition-all duration-300 flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                    : 'bg-white border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#FAFAFA]'
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
                className="flex-1 py-4 text-xs font-semibold tracking-[0.18em] uppercase bg-[#0A0A0A] text-white hover:bg-[#222222] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Zap className="h-4 w-4 fill-current" /> Buy Now
              </button>
            </div>

            {/* Free shipping note */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#555555] pt-1">
              <Truck className="h-4 w-4 text-[#0A0A0A]" />
              <span>Free Express Shipping across India on orders over ₹4,999</span>
            </div>

            {/* Accordion */}
            <div className="border border-[#E5E5E5] bg-white divide-y divide-[#E5E5E5]">
              {accordions.map((item, i) => (
                <div key={i} className="bg-white">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FAFAFA] transition-colors duration-300 group"
                  >
                    <span className="text-xs font-semibold text-[#0A0A0A] tracking-[0.16em] uppercase">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#0A0A0A] transition-transform duration-300 ${
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
                      <p className="px-5 pb-5 text-sm text-[#555555] leading-relaxed border-t border-[#F3F3F3] pt-3">
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
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs animate-fade-in"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white text-[#0A0A0A] border border-[#E5E5E5] shadow-2xl p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 border-b border-[#E5E5E5] pb-4">
              <h3 className="font-display font-extrabold text-xl text-[#0A0A0A] tracking-tight uppercase">
                SIZE GUIDE
              </h3>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="text-[#555555] hover:text-[#0A0A0A] transition-colors p-1"
                aria-label="Close size guide"
              >
                <ChevronDown className="h-5 w-5 rotate-180" />
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                  <th className="text-left py-3 px-2 font-mono text-[11px] tracking-[0.16em] text-[#666666] uppercase">
                    Size
                  </th>
                  <th className="text-right py-3 px-2 font-mono text-[11px] tracking-[0.16em] text-[#666666] uppercase">
                    Chest (in)
                  </th>
                  <th className="text-right py-3 px-2 font-mono text-[11px] tracking-[0.16em] text-[#666666] uppercase">
                    Length (in)
                  </th>
                  <th className="text-right py-3 px-2 font-mono text-[11px] tracking-[0.16em] text-[#666666] uppercase">
                    Shoulder (in)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {[
                  { size: 'S', chest: 40, length: 27, shoulder: 19 },
                  { size: 'M', chest: 42, length: 28, shoulder: 20 },
                  { size: 'L', chest: 44, length: 29, shoulder: 21 },
                  { size: 'XL', chest: 46, length: 30, shoulder: 22 },
                  { size: 'XXL', chest: 48, length: 31, shoulder: 23 },
                ].map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAFAFA]">
                    <td className="py-3 px-2 text-[#0A0A0A] font-mono font-bold">{row.size}</td>
                    <td className="py-3 px-2 text-right text-[#444444] font-mono">{row.chest}</td>
                    <td className="py-3 px-2 text-right text-[#444444] font-mono">{row.length}</td>
                    <td className="py-3 px-2 text-right text-[#444444] font-mono">{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-xs text-[#666666] leading-relaxed border-t border-[#E5E5E5] pt-4">
              All measurements are in inches and represent garment dimensions, not body measurements.
              NYVOR tees are engineered with a 220 GSM heavyweight regular fit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
