import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';

type Props = {
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
};

const categories = ['T-Shirts', 'Shirts', 'Hoodies', 'Sweatshirts', 'Jackets', 'Lowers', 'Dark Catalogue'];
const navLinks = [
  { label: 'Shop', to: '#shop', isHash: true },
  { label: 'Drops', to: '/drops', isHash: false },
  { label: 'About', to: '#discover', isHash: true },
  { label: 'Support', to: '#contact-info', isHash: true },
];

export function Header({ cartCount, onCartClick, onSearchClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#222227] ${
        scrolled
          ? 'bg-[#0F0F11]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.45)]'
          : 'bg-[#0F0F11]'
      }`}
    >
      <nav className="mx-auto max-w-[1600px] px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 text-[#F5F5F5] hover:text-[#D4AF37] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop nav left */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {navLinks.map((link) =>
              link.isHash ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(link.to);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      navigate(`/${link.to}`);
                    }
                  }}
                  className="px-4 py-2 text-xs font-medium tracking-[0.16em] uppercase text-[#B4B4BE] hover:text-[#D4AF37] transition-colors duration-300 relative group cursor-pointer"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="px-4 py-2 text-xs font-medium tracking-[0.16em] uppercase text-[#B4B4BE] hover:text-[#D4AF37] transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              )
            )}
            <div ref={megaRef} className="relative">
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                className="px-4 py-2 text-xs font-medium tracking-[0.16em] uppercase text-[#B4B4BE] hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1"
              >
                Categories
                <ChevronRight
                  className={`h-3 w-3 transition-transform duration-300 ${
                    megaOpen ? 'rotate-90 text-[#D4AF37]' : ''
                  }`}
                />
              </button>
              {megaOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#15151A] border border-[#2A2A32] shadow-2xl p-1.5 animate-fade-in">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setMegaOpen(false);
                        navigate(`/shop?category=${cat.toLowerCase()}`);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 text-xs font-medium tracking-[0.14em] uppercase text-[#D4D4DC] hover:text-[#D4AF37] hover:bg-[#1E1E25] transition-colors group"
                    >
                      {cat}
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#D4AF37]" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Logo center */}
          <Link to="/" className="flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <span className="font-display font-black text-2xl lg:text-3xl tracking-[0.12em] text-[#F5F5F5] hover:text-[#D4AF37] transition-colors duration-300 uppercase">
              NYVOR
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-1 flex-1 justify-end">
            <button
              onClick={onSearchClick}
              className="p-2.5 text-[#F5F5F5] hover:text-[#D4AF37] transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2.5 text-[#F5F5F5] hover:text-[#D4AF37] transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 bg-[#D4AF37] text-[#0F0F11] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-xs animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#0F0F11] border-r border-[#24242C] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[#222227]">
              <span className="font-display font-black text-xl tracking-[0.12em] text-[#F5F5F5] uppercase">
                NYVOR
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#B4B4BE] hover:text-[#D4AF37]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-1">
              {navLinks.map((link) =>
                link.isHash ? (
                  <a
                    key={link.label}
                    href={link.to}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      const el = document.querySelector(link.to);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        navigate(`/${link.to}`);
                      }
                    }}
                    className="block py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#F5F5F5] hover:text-[#D4AF37] transition-colors border-b border-[#222227]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#F5F5F5] hover:text-[#D4AF37] transition-colors border-b border-[#222227]"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <p className="pt-6 pb-3 font-mono text-[10px] tracking-[0.22em] text-[#D4AF37] uppercase">
                Categories
              </p>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setMobileOpen(false);
                    navigate(`/shop?category=${cat.toLowerCase()}`);
                  }}
                  className="flex items-center justify-between w-full py-3 text-xs font-medium tracking-[0.14em] uppercase text-[#B4B4BE] hover:text-[#D4AF37] transition-colors"
                >
                  {cat}
                  <ChevronRight className="h-3 w-3 text-[#D4AF37]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
