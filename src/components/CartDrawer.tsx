import { X, Plus, Minus, ShoppingBag, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type CartItem = {
  product: any;
  size: string;
  quantity: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
};

export function CartDrawer({ open, onClose, items, onUpdateQty, onRemove }: Props) {
  const navigate = useNavigate();

  // Helper functions for safe property extraction
  const getPrice = (product: any) => {
    return Number(product?.selling_price || product?.price || 799);
  };

  const getImage = (product: any) => {
    if (product?.image_url) return product.image_url;
    if (product?.image) return product.image;
    if (product?.imageUrl) return product.imageUrl;
    if (Array.isArray(product?.images) && product.images.length > 0) return product.images[0];
    return '';
  };

  const subtotal = items.reduce((sum, item) => sum + getPrice(item.product) * item.quantity, 0);

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className={`fixed inset-0 z-[70] ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-ink-base border-hairline-l flex flex-col transition-transform duration-400 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-hairline-b flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-accent" />
            <h3 className="font-display text-lg text-accent tracking-tight">
              YOUR BAG {items.length > 0 && `(${items.length})`}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-accent-muted hover:text-accent transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free shipping banner */}
        <div className="flex items-center gap-2 px-5 py-3 bg-ink-raised border-hairline-b flex-shrink-0">
          <Truck className="h-4 w-4 text-brand flex-shrink-0" />
          <p className="text-xs text-accent-muted">
            <span className="text-success font-medium">Complimentary Express Shipping</span> across India on all orders
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="h-16 w-16 border-hairline rounded-sm flex items-center justify-center">
              <ShoppingBag className="h-7 w-7 text-accent-dim" />
            </div>
            <div className="space-y-1">
              <p className="text-accent font-medium">Your bag is empty</p>
              <p className="text-sm text-accent-muted">Add items to get started.</p>
            </div>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-3 bg-accent text-ink-base text-sm tracking-wide-label uppercase font-semibold rounded-sm hover:bg-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map(({ product, size, quantity }, index) => {
                const itemPrice = getPrice(product);
                const itemImg = getImage(product);

                return (
                  <div key={`${product?.id || index}-${size}-${index}`} className="flex gap-4 border-hairline-b pb-4">
                    <div
                      className="h-28 w-22 flex-shrink-0 bg-ink-overlay border-hairline rounded-sm overflow-hidden cursor-pointer"
                      onClick={() => {
                        if (product?.id) {
                          navigate(`/product/${product.id}`);
                          onClose();
                        }
                      }}
                    >
                      <img src={itemImg} alt={product?.name || 'Product'} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] tracking-wide-label text-accent-dim uppercase">
                            {product?.category || 'NYVOR'}
                          </p>
                          <p className="text-sm text-accent truncate font-medium">{product?.name}</p>
                          <p className="text-xs text-accent-muted mt-1">Size: {size}</p>
                        </div>
                        <button
                          onClick={() => onRemove(index)}
                          className="text-accent-dim hover:text-brand transition-colors flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border-hairline rounded-sm">
                          <button
                            onClick={() => onUpdateQty(index, -1)}
                            className="p-1.5 text-accent-muted hover:text-accent transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-sm text-accent font-mono">{quantity}</span>
                          <button
                            onClick={() => onUpdateQty(index, 1)}
                            className="p-1.5 text-accent-muted hover:text-accent transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-sm text-accent">
                            ₹{(itemPrice * quantity).toLocaleString('en-IN')}
                          </p>
                          {quantity > 1 && (
                            <p className="text-[10px] text-accent-dim font-mono">
                              ₹{itemPrice.toLocaleString('en-IN')} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="border-hairline-t p-5 space-y-4 flex-shrink-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-accent-muted">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-accent-muted">
                  <span>Shipping</span>
                  <span className="font-mono text-success uppercase font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-accent pt-2 border-hairline-t">
                  <span className="font-semibold">Total</span>
                  <span className="font-mono font-semibold">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-accent text-ink-base text-sm tracking-wide-label uppercase font-semibold rounded-sm hover:bg-white transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full text-center text-sm text-accent-muted hover:text-accent transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
