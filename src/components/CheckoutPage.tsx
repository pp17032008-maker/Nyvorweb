import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './CartDrawer';
import { supabase } from '../supabase';
import { Truck, ShieldCheck, CreditCard, Banknote, ArrowLeft, CheckCircle2, Edit2 } from 'lucide-react';

type Props = {
  cartItems: CartItem[];
  onClearCart?: () => void;
};

export function CheckoutPage({ cartItems, onClearCart }: Props) {
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState<'online' | 'cod'>('online');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Customer Contact & Shipping Address Form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const getPrice = (product: any) => Number(product?.selling_price || product?.price || 799);
  const subtotal = cartItems.reduce((sum, item) => sum + getPrice(item.product) * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const generatedOrderId = `NYV-${Date.now()}`;
      
      // Clean structured cart items for database storage
      const formattedItems = cartItems.map((item) => ({
        id: item.product?.id || '',
        name: item.product?.name || 'NYVOR Product',
        size: item.size,
        color: item.product?.color || 'Standard',
        quantity: item.quantity,
        price: getPrice(item.product),
      }));

      // Insert payload matching all Supabase orders schema columns explicitly
      const { error } = await supabase.from('orders').insert([
        {
          order_id: generatedOrderId,
          order_number: generatedOrderId,  // Populates order_number column
          customer_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,       // Populates address column
          city: formData.city,             // Populates city column
          state: formData.state,           // Populates state column
          pincode: formData.pincode,       // Populates pincode column
          shipping_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          total_amount: subtotal,
          payment_mode: paymentMode,
          payment_status: paymentMode === 'cod' ? 'pending' : 'awaiting_payment',
          items: formattedItems,
          status: 'created',
        },
      ]);

      if (error) {
        console.error('Supabase Insertion Error:', error);
        throw new Error(error.message);
      }

      if (paymentMode === 'online') {
        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

        if (!(window as any).Razorpay) {
          alert('Razorpay SDK failed to load. Please check your internet connection or index.html configuration.');
          setLoading(false);
          return;
        }

        if (!razorpayKey) {
          alert('Razorpay Key ID is missing. Please ensure VITE_RAZORPAY_KEY_ID is set in your environment variables.');
          setLoading(false);
          return;
        }

        const options = {
          key: razorpayKey,
          amount: Math.round(subtotal * 100), // Amount in paise
          currency: 'INR',
          name: 'NYVOR',
          description: 'Luxury Streetwear Order',
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#000000',
          },
          handler: async function (response: any) {
            await supabase
              .from('orders')
              .update({ 
                payment_status: 'paid', 
                razorpay_payment_id: response.razorpay_payment_id,
                status: 'processing'
              })
              .eq('order_id', generatedOrderId);

            setOrderId(generatedOrderId);
            setOrderComplete(true);
            if (onClearCart) onClearCart();
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        setOrderId(generatedOrderId);
        setOrderComplete(true);
        if (onClearCart) onClearCart();
      }
    } catch (err: any) {
      console.error('Order Error:', err);
      alert(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-16 w-16 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 uppercase">Order Placed Successfully!</h1>
        <p className="text-gray-400 mb-4">
          Order Reference: <span className="text-accent font-mono font-bold">{orderId}</span>
        </p>
        <p className="text-sm text-gray-400 mb-8">
          We have received your delivery details and started processing your order. Estimated delivery: 3–5 business days.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-accent text-ink-base font-semibold uppercase tracking-wider rounded-sm hover:bg-white transition-colors"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Edit Selection
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-8">Order & Shipping Details</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 border border-gray-800 rounded-sm">
          <p className="text-gray-400 mb-4">No items selected. Please add a product to your bag.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-accent text-ink-base uppercase font-semibold text-sm rounded-sm hover:bg-white"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form & Payment Toggle */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-ink-raised p-6 rounded-sm border border-gray-800 space-y-4">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wide">1. Customer Contact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-ink-base border border-gray-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                    placeholder="Priyanshu Pandey"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-ink-base border border-gray-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-ink-base border border-gray-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                  placeholder="contact@nyvor.co"
                />
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-ink-raised p-6 rounded-sm border border-gray-800 space-y-4">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wide">2. Delivery Address</h2>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">House / Building / Street Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-ink-base border border-gray-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                  placeholder="Enter complete street address"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-ink-base border border-gray-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                    placeholder="Dehradun"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-ink-base border border-gray-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                    placeholder="Uttarakhand"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-ink-base border border-gray-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                    placeholder="248001"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-ink-raised p-6 rounded-sm border border-gray-800 space-y-4">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wide">3. Select Payment Option</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentMode('online')}
                  className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${
                    paymentMode === 'online'
                      ? 'border-accent bg-black/50 text-white'
                      : 'border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Online Payment</p>
                    <p className="text-xs text-gray-400">UPI, Cards, Netbanking</p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMode('cod')}
                  className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${
                    paymentMode === 'cod'
                      ? 'border-accent bg-black/50 text-white'
                      : 'border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <Banknote className="h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Cash on Delivery</p>
                    <p className="text-xs text-gray-400">Pay cash upon delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Items Re-verification & Order Totals */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ink-raised p-6 rounded-sm border border-gray-800 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <h2 className="text-lg font-semibold text-white uppercase tracking-wide">
                  Review Selected Items ({cartItems.length})
                </h2>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-xs text-accent flex items-center gap-1 hover:underline"
                >
                  <Edit2 className="h-3 w-3" /> Edit Bag
                </button>
              </div>

              {/* Items Card List displaying chosen Size, Color & Quantity */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 border-b border-gray-800/60 pb-3">
                    <img
                      src={item.product?.image_url || item.product?.image || ''}
                      alt={item.product?.name}
                      className="h-20 w-16 object-cover rounded-sm bg-gray-900 border border-gray-800 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{item.product?.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                        <span>Size: <strong className="text-white">{item.size}</strong></span>
                        {item.product?.color && (
                          <span>Color: <strong className="text-white">{item.product.color}</strong></span>
                        )}
                        <span>Qty: <strong className="text-white">{item.quantity}</strong></span>
                      </div>
                      <p className="text-sm font-mono text-accent mt-2 font-medium">
                        ₹{(getPrice(item.product) * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Estimation */}
              <div className="flex items-center gap-3 bg-black/40 p-3 rounded-sm border border-gray-800">
                <Truck className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Estimated Delivery</p>
                  <p className="text-[11px] text-gray-400">Dispatch in 24 hours • Delivered in 3–5 business days</p>
                </div>
              </div>

              {/* Order Amount Calculation */}
              <div className="space-y-2 border-t border-gray-800 pt-4 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Express Shipping</span>
                  <span className="font-mono text-emerald-400 uppercase font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base border-t border-gray-800 pt-3">
                  <span>Total Amount</span>
                  <span className="font-mono text-accent">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Final Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-accent text-ink-base font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : paymentMode === 'online' ? 'Proceed to Pay' : 'Confirm Cash on Delivery'}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <ShieldCheck className="h-4 w-4" /> 256-Bit Encrypted Secure Checkout
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
