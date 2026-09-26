export type Category = 'Tees' | 'Shirts' | 'Hoodies' | 'Jackets' | 'Lowers' | 'Jeans';

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  colors: { name: string; hex: string }[];
  images: string[];
  tag?: string;
  fabricSpec: string;
  careInstructions: string;
  shippingInfo: string;
};

export const products: Product[] = [
  {
    id: 'p01',
    name: 'Heavyweight Tee // Onyx',
    category: 'Tees',
    price: 2499,
    colors: [
      { name: 'Onyx', hex: '#1A1A1E' },
      { name: 'Bone', hex: '#E8E4D9' },
    ],
    images: [
      'https://images.pexels.com/photos/13020610/pexels-photo-13020610.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/9285919/pexels-photo-9285919.png?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/3290886/pexels-photo-3290886.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/3998647/pexels-photo-3998647.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    tag: 'NEW',
    fabricSpec: 'Premium heavyweight combed cotton. Pre-shrunk, bio-washed. Double-needle stitched seams. Ribbed crew neckline with reinforced taping. Drop-shoulder construction for an oversized fit.',
    careInstructions: 'Machine wash cold inside-out with like colours. Do not bleach. Tumble dry low. Do not iron print. Do not dry clean. Wash before first wear to prevent colour transfer.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p02',
    name: 'Shadow Hoodie // Faded Black',
    category: 'Hoodies',
    price: 4499,
    colors: [
      { name: 'Faded Black', hex: '#2A2A2E' },
      { name: 'Charcoal', hex: '#3A3A40' },
      { name: 'Bone', hex: '#E8E4D9' },
    ],
    images: [
      'https://images.pexels.com/photos/3894527/pexels-photo-3894527.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/20706220/pexels-photo-20706220.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/5840443/pexels-photo-5840443.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/7173190/pexels-photo-7173190.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    tag: 'DROP 01',
    fabricSpec: 'Premium heavyweight fleece-back cotton. Brushed inner for warmth. Double-layer hood with flat drawcords. Kangaroo pocket with reinforced bartacking. Boxy oversized fit.',
    careInstructions: 'Machine wash cold inside-out with like colours. Do not bleach. Tumble dry low. Do not iron print. Do not dry clean. Wash before first wear.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p03',
    name: 'Technical Jacket // Night Ops',
    category: 'Jackets',
    price: 8999,
    colors: [
      { name: 'Black', hex: '#0F0F11' },
      { name: 'Gunmetal', hex: '#454550' },
    ],
    images: [
      'https://images.pexels.com/photos/33772484/pexels-photo-33772484.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/18286291/pexels-photo-18286291.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/33772479/pexels-photo-33772479.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/29817624/pexels-photo-29817624.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    fabricSpec: 'Heavyweight cotton-twill shell with matte water-repellent finish. Fully lined interior. YKK metal zippers throughout. Articulated sleeves for mobility. Hidden interior pocket.',
    careInstructions: 'Dry clean recommended. Alternatively, machine wash cold on gentle cycle. Do not bleach. Hang dry only. Do not iron. Reapply DWR treatment after multiple washes.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p04',
    name: 'Raw Denim // Indigo Wash',
    category: 'Jeans',
    price: 5999,
    colors: [
      { name: 'Raw Indigo', hex: '#1E2A3A' },
      { name: 'Washed', hex: '#4A5670' },
      { name: 'Black', hex: '#161618' },
    ],
    images: [
      'https://images.pexels.com/photos/36607453/pexels-photo-36607453.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/7061988/pexels-photo-7061988.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/36607452/pexels-photo-36607452.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/4271568/pexels-photo-4271568.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    fabricSpec: '14oz Japanese selvedge denim. Raw and unwashed — develops unique fades over time. Five-pocket construction. Reinforced stress points. Tapered fit from knee to hem. Mid-rise waist.',
    careInstructions: 'Wash sparingly — every 4–6 months of regular wear. When washing: soak in cold water with mild detergent inside-out. Hang dry away from direct sunlight. Do not tumble dry. Do not bleach.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p05',
    name: 'Box Tee // Concrete',
    category: 'Tees',
    price: 2199,
    colors: [
      { name: 'Concrete', hex: '#8A8A90' },
      { name: 'Onyx', hex: '#1A1A1E' },
    ],
    images: [
      'https://images.pexels.com/photos/9285919/pexels-photo-9285919.png?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/13020610/pexels-photo-13020610.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/5975344/pexels-photo-5975344.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/8408556/pexels-photo-8408556.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    fabricSpec: 'Premium heavyweight combed cotton. Pre-shrunk, bio-washed. Boxy fit with cropped length. Ribbed crew neckline. Water-based flex print on front and back.',
    careInstructions: 'Machine wash cold inside-out with like colours. Do not bleach. Tumble dry low. Do not iron print. Do not dry clean.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p06',
    name: 'Oversized Hood // Monochrome',
    category: 'Hoodies',
    price: 4799,
    colors: [
      { name: 'Black', hex: '#161618' },
      { name: 'Off-White', hex: '#D8D4C9' },
    ],
    images: [
      'https://images.pexels.com/photos/20706220/pexels-photo-20706220.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/3894527/pexels-photo-3894527.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/7173190/pexels-photo-7173190.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/5840443/pexels-photo-5840443.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    tag: 'NEW',
    fabricSpec: 'Premium heavyweight fleece-back cotton. Oversized boxy fit. Double-layer hood. Heavyweight metal tipped drawcords. Kangaroo pocket. WFP (water-based flex print) graphics.',
    careInstructions: 'Machine wash cold inside-out with like colours. Do not bleach. Tumble dry low. Do not iron print. Do not dry clean.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p07',
    name: 'Leather Jacket // Jet Black',
    category: 'Jackets',
    price: 12999,
    colors: [
      { name: 'Jet Black', hex: '#0A0A0C' },
    ],
    images: [
      'https://images.pexels.com/photos/18286291/pexels-photo-18286291.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/33772484/pexels-photo-33772484.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/29817624/pexels-photo-29817624.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/8108560/pexels-photo-8108560.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    fabricSpec: 'Genuine premium leather shell. Quilted satin lining with insulated filling. YKK metal zippers. Zippered cuffs and pockets. Notch collar. Tailored slim fit.',
    careInstructions: 'Professional leather cleaning only. Do not machine wash. Do not bleach. Do not tumble dry. Store on a wide hanger in a cool, dry place. Condition leather every 3–6 months.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on this item. Easy 7-day returns.',
  },
  {
    id: 'p08',
    name: 'Distressed Denim // Street',
    category: 'Jeans',
    price: 5499,
    colors: [
      { name: 'Mid Wash', hex: '#5A6890' },
      { name: 'Black', hex: '#161618' },
    ],
    images: [
      'https://images.pexels.com/photos/7061988/pexels-photo-7061988.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/36607453/pexels-photo-36607453.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/16499256/pexels-photo-16499256.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/4271568/pexels-photo-4271568.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    fabricSpec: '12oz stretch denim with 2% elastane for mobility. Pre-distressed with hand-finished abrasions. Five-pocket construction. Slim straight fit. Mid-rise waist.',
    careInstructions: 'Machine wash cold inside-out with like colours. Do not bleach. Tumble dry low. Warm iron if needed. Wash before first wear to set distressing.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p09',
    name: 'Oversized Shirt // Noir',
    category: 'Shirts',
    price: 3299,
    colors: [
      { name: 'Noir', hex: '#0F0F11' },
      { name: 'Bone', hex: '#E8E4D9' },
    ],
    images: [
      'https://images.pexels.com/photos/29297644/pexels-photo-29297644.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/26903605/pexels-photo-26903605.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/12624655/pexels-photo-12624655.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/8408556/pexels-photo-8408556.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    tag: 'NEW',
    fabricSpec: 'Premium heavyweight cotton poplin. Crisp hand-feel with matte finish. Oversized boxy fit. Button-down collar. Coconut shell buttons. Dropped shoulders. Curved hem.',
    careInstructions: 'Machine wash cold with like colours. Do not bleach. Tumble dry low. Warm iron if needed. Do not dry clean. Button up before washing to maintain shape.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p10',
    name: 'Button-Up Shirt // Phantom',
    category: 'Shirts',
    price: 2999,
    colors: [
      { name: 'Phantom', hex: '#222226' },
      { name: 'Concrete', hex: '#8A8A90' },
    ],
    images: [
      'https://images.pexels.com/photos/26903605/pexels-photo-26903605.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/29297644/pexels-photo-29297644.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/11576957/pexels-photo-11576957.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/12624655/pexels-photo-12624655.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    fabricSpec: 'Premium cotton twill. Matte finish with subtle diagonal weave. Relaxed regular fit. Pointed collar. Metal buttons. Single chest pocket. Straight hem with side vents.',
    careInstructions: 'Machine wash cold with like colours. Do not bleach. Tumble dry low. Warm iron if needed.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p11',
    name: 'Cargo Pants // Tactical Black',
    category: 'Lowers',
    price: 3999,
    colors: [
      { name: 'Tactical Black', hex: '#161618' },
      { name: 'Olive', hex: '#3A3E2A' },
    ],
    images: [
      'https://images.pexels.com/photos/18393526/pexels-photo-18393526.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/35043249/pexels-photo-35043249.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/20267265/pexels-photo-20267265.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/4271568/pexels-photo-4271568.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    tag: 'DROP 01',
    fabricSpec: 'Premium heavyweight cotton canvas. Reinforced bartacking at all stress points. Six-pocket configuration with bellows cargo pockets. Adjustable drawcord hem. Relaxed tapered fit. Mid-rise.',
    careInstructions: 'Machine wash cold inside-out with like colours. Do not bleach. Tumble dry low. Do not iron. Close all velcro and zippers before washing.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
  {
    id: 'p12',
    name: 'Track Pants // Shadow',
    category: 'Lowers',
    price: 3499,
    colors: [
      { name: 'Shadow', hex: '#222226' },
      { name: 'Onyx', hex: '#1A1A1E' },
    ],
    images: [
      'https://images.pexels.com/photos/35043249/pexels-photo-35043249.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/18393526/pexels-photo-18393526.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/20267261/pexels-photo-20267261.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
      'https://images.pexels.com/photos/4271568/pexels-photo-4271568.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    ],
    fabricSpec: 'Premium cotton-polyester fleece blend. Brushed inner for comfort. Elasticated waistband with drawcord. Zippered side pockets. Tapered ankle with ribbed cuffs. Relaxed fit.',
    careInstructions: 'Machine wash cold inside-out with like colours. Do not bleach. Tumble dry low. Do not iron. Do not dry clean.',
    shippingInfo: 'Dispatched within 24–48 hours via Qikink fulfillment. Express delivery in 2–4 business days across India. Cash on delivery available. Free shipping on orders over ₹4,999. Easy 7-day returns.',
  },
];

export const categories = ['All Drops', 'Tees', 'Shirts', 'Hoodies', 'Jackets', 'Lowers', 'Jeans'] as const;
export const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low'] as const;
export const sizes = ['S', 'M', 'L', 'XL', 'XXL'] as const;

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
