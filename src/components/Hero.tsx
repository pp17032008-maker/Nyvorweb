import { ArrowRight } from 'lucide-react';

export function Hero() {
  const scrollToShop = () => {
    const el = document.querySelector('#shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-[#0F0F11] text-[#F5F5F5] border-b border-[#222227] overflow-hidden">
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 lg:min-h-[calc(100vh-96px)]">
        {/* Left Half: Maison Brand Identity & Summary */}
        <div className="flex flex-col justify-center px-5 py-9 sm:px-8 lg:px-14 lg:py-14 border-b lg:border-b-0 lg:border-r border-[#222227]">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.22em] text-[#8E8E98] uppercase mb-6">
              <span>MAISON NYVOR / 2026</span>
              <span>DEHRADUN — INDIA</span>
            </div>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#16161B] border border-[#26262E] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase">
                AUTUMN / WINTER EDIT · UNISEX
              </span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-[-0.03em] text-[#F5F5F5] uppercase leading-[0.95] mb-4">
              NYVOR
            </h1>

            <p className="font-mono text-xl sm:text-2xl text-[#D4AF37] tracking-[-0.01em] mb-5">
              Beyond Elegance.
            </p>

            <p className="text-sm sm:text-base text-[#B4B4BE] leading-relaxed max-w-md">
              Refined dark-mode silhouettes crafted for modern presence, clean structure, and lasting everyday authority.
            </p>
          </div>
        </div>

        {/* Right Half: Luxury Group Editorial Campaign Visual + Bottom Shop CTA */}
        <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-full bg-[#141418] overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1400&q=85"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1400';
            }}
            alt="Maison NYVOR Unisex Group Editorial Campaign"
            className="w-full h-full object-cover object-center brightness-90 contrast-105 group-hover:scale-[1.03] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-[#0F0F11]/25 to-transparent" />

          <div className="absolute top-5 right-5 px-3 py-1 bg-[#0F0F11]/80 backdrop-blur-md border border-[#2A2A32]">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase">
              CAMPAIGN · 01
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
            <button
              onClick={scrollToShop}
              className="w-full flex items-center justify-between px-6 py-4 bg-[#0F0F11]/90 hover:bg-[#D4AF37] text-[#F5F5F5] hover:text-[#0F0F11] border border-[#D4AF37]/60 hover:border-[#D4AF37] backdrop-blur-md transition-all duration-300 group/btn cursor-pointer"
            >
              <div className="text-left">
                <p className="font-mono text-[10px] tracking-[0.22em] text-[#D4AF37] group-hover/btn:text-[#0F0F11]/80 uppercase">
                  OBSIDIAN &amp; SIGNATURE CAPSULE
                </p>
                <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mt-0.5">
                  SHOP THE COLLECTION
                </p>
              </div>
              <span className="h-9 w-9 rounded-full border border-current flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
