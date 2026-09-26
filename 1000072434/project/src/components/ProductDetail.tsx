import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check, ChevronDown, Truck, Ruler } from 'lucide-react';
import { getProductById, sizes, type Product } from '@/data/products';

type Props = {
  onAddToBag: (product: Product, size: string, quantity: number) => void;
};

export function ProductDetail({ onAddToBag }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

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

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    onAddToBag(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const accordions = [
    { title: 'Fabric Specs & Quality', content: product.fabricSpec },
    { title: 'Care Instructions', content: product.careInstructions },
    { title: 'Qikink Fulfillment & Shipping', content: product.shippingInfo },
  ];

  return (
    <div className="pt-20">
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
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] border-hairline rounded-sm overflow-hidden bg-ink-overlay">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.tag && (
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-ink-base/80 backdrop-blur-sm border-hairline text-[10px] tracking-wide-label text-brand uppercase rounded-sm">
                  {product.tag}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square border rounded-sm overflow-hidden transition-all duration-300 ${
                    activeImage === i ? 'border-brand ring-1 ring-brand/30' : 'border-hairline opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-3">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase">
                {product.category}
              </p>
              <h1 className="font-display text-3xl lg:text-4xl tracking-ultra-tight text-accent leading-tight">
                {product.name}
              </h1>
              <p className="font-mono text-2xl text-accent">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 border-hairline rounded-sm bg-ink-raised">
              <div className="h-2 w-2 rounded-full bg-brand" />
              <span className="text-xs tracking-wide-label text-accent uppercase">
                Premium Quality Fabric
              </span>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase">
                Colour — {product.colors[0].name}
              </p>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    className="h-7 w-7 rounded-full border-hairline hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

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
                        ? 'bg-accent text-ink-base border-accent'
                        : 'border-hairline text-accent hover:bg-ink-raised hover:border-line-strong'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-xs text-brand animate-fade-in">
                  Please select a size before adding to bag.
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
                <span className="px-6 text-sm text-accent font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-accent-muted hover:text-accent transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to bag */}
            <button
              onClick={handleAddToBag}
              className={`w-full py-4 text-sm font-semibold tracking-wide-label uppercase rounded-sm transition-all duration-300 ${
                added
                  ? 'bg-success text-white'
                  : 'bg-accent text-ink-base hover:bg-white'
              }`}
            >
              {added ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-5 w-5" /> Added to Bag
                </span>
              ) : (
                'Add to Bag'
              )}
            </button>

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
                  { size: 'S', chest: 42, length: 27, shoulder: 20 },
                  { size: 'M', chest: 44, length: 28, shoulder: 21 },
                  { size: 'L', chest: 46, length: 29, shoulder: 22 },
                  { size: 'XL', chest: 48, length: 30, shoulder: 23 },
                  { size: 'XXL', chest: 50, length: 31, shoulder: 24 },
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
              NYVOR tees and hoodies are designed with an oversized / boxy fit. If you prefer a regular fit,
              size down.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
