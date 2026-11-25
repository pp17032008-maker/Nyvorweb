import { useState, useEffect } from 'react';
import { ArrowUpRight, Plus, Minus, Check, ChevronDown } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Overview', 'Atelier', 'Collections', 'Journal'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#222227] ${
        scrolled
          ? 'bg-[#0F0F11]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.45)]'
          : 'bg-[#0F0F11]'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative h-7 w-7 rounded-full border border-[#D4AF37]/60 bg-[#16161B] flex items-center justify-center overflow-hidden">
              <span className="font-display font-black text-sm text-[#D4AF37] relative">N</span>
            </div>
            <span className="font-display font-black text-lg tracking-[0.14em] text-[#F5F5F5] uppercase">
              NYVOR
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-4 py-2 text-xs font-medium tracking-[0.16em] uppercase text-[#B4B4BE] hover:text-[#D4AF37] transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="group flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold tracking-[0.16em] uppercase text-[#0F0F11] bg-[#D4AF37] hover:bg-[#F5F5F5] transition-all duration-300"
            >
              Inquire
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`h-[1.5px] w-6 bg-[#F5F5F5] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-[1.5px] w-6 bg-[#F5F5F5] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[1.5px] w-6 bg-[#F5F5F5] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#222227] bg-[#0F0F11] pb-6 pt-4 space-y-1">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-xs font-medium tracking-[0.16em] uppercase text-[#B4B4BE] hover:text-[#D4AF37] hover:bg-[#16161B] transition-colors"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 mt-2 rounded-full text-xs font-semibold tracking-[0.16em] uppercase text-[#0F0F11] bg-[#D4AF37] text-center"
            >
              Inquire
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section id="overview" className="relative min-h-screen flex items-center pt-20 bg-[#0F0F11] text-[#F5F5F5] overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#2A2A32] bg-[#16161B] opacity-0 animate-fade-up"
              style={{ animationDelay: '0ms' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="font-mono text-[10px] tracking-[0.22em] text-[#D4AF37] uppercase">
                Autumn / Winter 2026 · Dehradun
              </span>
            </div>

            <h1
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] tracking-[-0.04em] text-[#F5F5F5] text-balance opacity-0 animate-fade-up"
              style={{ animationDelay: '100ms' }}
            >
              The art of
              <br />
              <span className="italic font-normal text-[#D4AF37]">restraint</span>
              <span className="text-[#F5F5F5]">.</span>
            </h1>

            <p
              className="max-w-xl text-lg text-[#B4B4BE] leading-[1.6] opacity-0 animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              A considered approach to unisex, where every element serves a purpose
              and every detail is deliberate. Crafted for those who understand that
              true presence speaks quietly.
            </p>

            <div
              className="flex flex-wrap items-center gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <a
                href="#collections"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] text-[#0F0F11] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#F5F5F5] transition-all duration-300"
              >
                Explore Collections
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#atelier"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#2E2E36] bg-[#16161B] text-xs font-semibold tracking-[0.18em] uppercase text-[#F5F5F5] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
              >
                Visit the Atelier
              </a>
            </div>
          </div>

          <div
            className="lg:col-span-5 opacity-0 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <div className="relative aspect-[4/5] border border-[#26262E] bg-[#16161B] overflow-hidden group">
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div className="flex items-start justify-between border-b border-[#26262E] pb-5">
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-[#8A8A94] uppercase">
                      Edition
                    </p>
                    <p className="font-mono text-sm text-[#D4AF37]">No. 001 / 100</p>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-[#D4AF37]/50 bg-[#0F0F11] flex items-center justify-center">
                    <span className="font-display font-black text-sm text-[#D4AF37]">N</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#26262E] pt-6">
                  <div className="h-[1.5px] w-12 bg-[#D4AF37]" />
                  <p className="font-display font-extrabold text-2xl text-[#F5F5F5] leading-tight uppercase tracking-[-0.02em]">
                    Obsidian
                    <br />
                    Series
                  </p>
                  <p className="font-mono text-[11px] text-[#9A9AA3] tracking-[0.18em] uppercase">
                    220 GSM Cotton · Classic Fit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-20 lg:mt-32 grid grid-cols-2 md:grid-cols-4 border-t border-l border-[#222227] opacity-0 animate-fade-up"
          style={{ animationDelay: '500ms' }}
        >
          {[
            { label: 'Fabric Weight', value: '220 GSM' },
            { label: 'Fit Profile', value: 'Classic' },
            { label: 'Headquarters', value: 'Dehradun' },
            { label: 'Focus', value: 'Unisex' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border-r border-b border-[#222227] bg-[#0F0F11] p-6 lg:p-8 group hover:bg-[#16161B] transition-colors duration-300"
            >
              <p className="font-mono text-[10px] tracking-[0.22em] text-[#8A8A94] uppercase mb-3">
                {stat.label}
              </p>
              <p className="font-display font-extrabold text-2xl lg:text-3xl text-[#F5F5F5] group-hover:text-[#D4AF37] tracking-tight transition-colors duration-300">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Collections() {
  const items = [
    {
      name: 'Obsidian',
      desc: 'Deep black silhouettes and clean dark-mode essentials.',
      tag: 'Core Dark',
      pieces: 'Signature Series',
    },
    {
      name: 'Brume',
      desc: 'Soft tonal layers and muted winter textures.',
      tag: 'Seasonal',
      pieces: 'Capsule Edit',
    },
    {
      name: 'Aurum',
      desc: 'Matte gold accents and embroidered crest detailing.',
      tag: 'Gold Edit',
      pieces: 'Limited Run',
    },
    {
      name: 'Vellum',
      desc: 'Clean neutral contrasts crafted for everyday wear.',
      tag: 'Essentials',
      pieces: 'Archive Edit',
    },
  ];

  return (
    <section id="collections" className="relative py-24 lg:py-32 border-t border-[#222227] bg-[#0F0F11] text-[#F5F5F5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-mono text-[11px] tracking-[0.24em] text-[#D4AF37] uppercase">
            Explore NYVOR Creations
          </p>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] text-[#F5F5F5]">
            Collections
          </h2>
          <p className="text-[#B4B4BE] leading-relaxed">
            Focused unisex chapters built around clean proportions, 220 GSM cotton, and enduring dark-mode character.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="group bg-[#141419] border border-[#24242C] hover:border-[#D4AF37]/70 p-8 lg:p-10 transition-colors duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-xs text-[#8A8A94]">
                  0{i + 1}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase border border-[#2E2E36] bg-[#0F0F11] px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>

              <div className="aspect-[4/5] sm:aspect-[16/10] mb-8 border border-[#24242C] overflow-hidden relative bg-[#0F0F11]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-black text-5xl sm:text-6xl text-[#F5F5F5]/[0.05] group-hover:text-[#D4AF37]/[0.14] transition-all duration-500 group-hover:scale-105 uppercase">
                    {item.name}
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#B4B4BE] leading-relaxed max-w-xs">
                    {item.desc}
                  </p>
                  <p className="text-xs text-[#8A8A94] font-mono pt-2">
                    {item.pieces}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full border border-[#2E2E36] bg-[#0F0F11] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 text-[#F5F5F5] group-hover:text-[#0F0F11] transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Atelier() {
  const steps = [
    {
      num: '01',
      title: 'Concept & Direction',
      desc: 'Defining sharp dark-mode aesthetics, clean graphics, and classic silhouettes with clear intent.',
    },
    {
      num: '02',
      title: 'Fabric & Fit',
      desc: 'Selecting 220 GSM cotton and regular/classic cuts built for everyday structure and comfort.',
    },
    {
      num: '03',
      title: 'Production & Finish',
      desc: 'Refining embroidery, print alignment, and finishing standards across every drop.',
    },
    {
      num: '04',
      title: 'Dispatch & Expansion',
      desc: 'Delivering directly to customers online while scaling local retail partnerships from Dehradun.',
    },
  ];

  return (
    <section id="atelier" className="relative py-24 lg:py-32 border-t border-[#222227] bg-[#141419] text-[#F5F5F5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-6">
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#D4AF37] uppercase">
              The Process
            </p>
            <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] text-[#F5F5F5] leading-tight">
              From vision
              <br />
              to <span className="italic font-normal text-[#D4AF37]">standard</span>
            </h2>
            <p className="text-[#B4B4BE] leading-relaxed">
              Every release follows a disciplined workflow—turning focused ideas into consistent unisex pieces.
            </p>
            <div className="pt-4 border-t border-[#26262E]">
              <p className="font-mono text-[10px] tracking-[0.22em] text-[#8A8A94] uppercase pt-4">
                Base Standard
              </p>
              <p className="font-display font-bold text-3xl text-[#D4AF37] mt-2">220 GSM</p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#0F0F11] border border-[#24242C] divide-y divide-[#222227]">
            {steps.map((step) => (
              <div
                key={step.num}
                className="group bg-[#0F0F11] p-8 lg:p-10 hover:bg-[#16161B] transition-colors duration-300"
              >
                <div className="flex items-start gap-8">
                  <span className="font-mono text-sm text-[#D4AF37] pt-1">
                    {step.num}
                  </span>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-display font-bold text-2xl text-[#F5F5F5] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[#B4B4BE] leading-relaxed max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full border border-[#2E2E36] flex items-center justify-center opacity-75 group-hover:opacity-100 group-hover:border-[#D4AF37] transition-all duration-300">
                    <Plus className="h-3.5 w-3.5 text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const tiers = [
    {
      name: 'Core Tee',
      price: '₹499',
      period: 'per piece',
      desc: 'Clean everyday unisex crafted in 220 GSM cotton.',
      features: [
        '220 GSM breathable cotton',
        'Regular & classic fit',
        'Minimal crest or graphic detail',
        'Pan-India delivery',
      ],
      featured: false,
    },
    {
      name: 'Signature Sweatshirt',
      price: '₹699',
      period: 'per piece',
      desc: 'Structured dark-mode layering for daily wear.',
      features: [
        'Clean street-luxury silhouette',
        'Durable print & stitching',
        'Consistent sizing across drops',
        'Direct online & marketplace availability',
      ],
      featured: true,
    },
    {
      name: 'Archive Hoodie',
      price: '₹799',
      period: 'per piece',
      desc: 'Statement dark-mode hoodies from the NYVOR catalog.',
      features: [
        'Bold front & back compositions',
        'Classic structured fit',
        'Built for cooler seasons',
        'Limited seasonal drops',
      ],
      featured: false,
    },
  ];

  return (
    <section id="journal" className="relative py-24 lg:py-32 border-t border-[#222227] bg-[#0F0F11] text-[#F5F5F5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center space-y-4 mb-16">
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#D4AF37] uppercase">
            Archive Lineup
          </p>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] text-[#F5F5F5]">
            Signature unisex tiers
          </h2>
          <p className="max-w-xl mx-auto text-[#B4B4BE] leading-relaxed">
            Accessible street-luxury essentials designed around sharp presentation, reliable fit, and clean dark aesthetics.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 lg:p-10 border transition-colors duration-300 ${
                tier.featured
                  ? 'bg-[#16161B] border-[#D4AF37]'
                  : 'bg-[#121216] border-[#24242C] hover:border-[#D4AF37]/70'
              }`}
            >
              {tier.featured && (
                <div className="mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-[#D4AF37] text-[#0F0F11] font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">
                    Signature
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-[#F5F5F5] tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-[#B4B4BE] leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-t border-[#24242C]">
                  <span className="font-display font-extrabold text-4xl text-[#D4AF37] tracking-tight pt-4">
                    {tier.price}
                  </span>
                  <span className="font-mono text-xs text-[#8A8A94] tracking-wide uppercase">
                    {tier.period}
                  </span>
                </div>

                <ul className="space-y-3 pt-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#D4D4DC] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#shop"
                  className={`block text-center py-3.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 ${
                    tier.featured
                      ? 'bg-[#D4AF37] text-[#0F0F11] hover:bg-[#F5F5F5]'
                      : 'border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0F11]'
                  }`}
                >
                  Shop Collection
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is NYVOR’s primary focus?',
      a: 'NYVOR is a unisex streetwear and apparel brand built around clean dark-mode presentation, sharp graphics, and consistent everyday wear.',
    },
    {
      q: 'What fabric and fit standards does NYVOR use?',
      a: 'Our core specifications center on 220 GSM cotton and regular/classic fits designed for dependable structure and comfort.',
    },
    {
      q: 'Where is NYVOR based and how does shipping work?',
      a: 'NYVOR operates out of Dehradun with dispatch across India through our storefront and marketplace channels.',
    },
    {
      q: 'Are new designs released in limited drops?',
      a: 'Yes—we introduce new graphics and capsule pieces periodically while keeping core favorites in rotation.',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 border-t border-[#222227] bg-[#141419] text-[#F5F5F5]">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center space-y-4 mb-16">
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#D4AF37] uppercase">
            Considered
          </p>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] text-[#F5F5F5]">
            Questions
          </h2>
        </div>

        <div className="bg-[#0F0F11] border border-[#24242C] divide-y divide-[#222227]">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#0F0F11]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 lg:p-7 text-left hover:bg-[#16161B] transition-colors duration-300 group"
              >
                <span className="font-display font-bold text-lg text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors tracking-tight pr-4">
                  {faq.q}
                </span>
                <div className="h-8 w-8 rounded-full border border-[#2E2E36] flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37] transition-colors duration-300">
                  {open === i ? (
                    <Minus className="h-4 w-4 text-[#D4AF37]" />
                  ) : (
                    <Plus className="h-4 w-4 text-[#B4B4BE]" />
                  )}
                </div>
              </button>
              <div
                className={`grid transition-all duration-500 ease-out ${
                  open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 lg:px-7 pb-6 lg:pb-7 text-[#B4B4BE] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandStoryAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative py-16 border-t border-[#222227] bg-[#0F0F11] text-[#F5F5F5]">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="border border-[#24242C] bg-[#141419]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-6 lg:p-8 text-left hover:bg-[#191920] transition-colors duration-300 group"
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-[#D4AF37] uppercase mb-1">
                Origins &amp; Philosophy
              </p>
              <h3 className="font-display font-extrabold text-2xl lg:text-3xl text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors tracking-tight">
                About NYVOR &amp; Brand Story
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full border border-[#2E2E36] bg-[#0F0F11] flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37] transition-colors">
              <ChevronDown className={`h-5 w-5 text-[#D4AF37] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <div
            className={`grid transition-all duration-500 ease-out ${
              isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-6 lg:p-8 pt-6 space-y-6 text-[#B4B4BE] leading-relaxed border-t border-[#222227] bg-[#0F0F11]">
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-lg text-[#F5F5F5]">The Beginning</h4>
                  <p>
                    NYVOR began with a focused ambition: to build a distinct unisex brand capable of delivering clean, high-standard apparel with an unmistakable dark-mode identity.
                  </p>
                  <p>
                    Built from disciplined execution rather than excess, every step focuses on sharpening the brand’s visual identity, catalog quality, and customer experience.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#222227]">
                  <h4 className="font-display font-bold text-lg text-[#F5F5F5]">The Brand &amp; Philosophy</h4>
                  <p>
                    NYVOR is built around the belief that modern unisex should pair bold editorial clarity with practical wearability—from product framing and typography to fabric selection and presentation.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 pt-2">
                    <li><strong className="text-[#D4AF37]">Design:</strong> Minimalist dark luxury paired with sharp streetwear character.</li>
                    <li><strong className="text-[#D4AF37]">Quality:</strong> Careful attention to fabric weight, print clarity, and clean presentation.</li>
                    <li><strong className="text-[#D4AF37]">Comfort:</strong> Classic and regular fits engineered for confident everyday wear.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 border-t border-[#222227] bg-[#141419] text-[#F5F5F5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative border border-[#26262E] bg-[#0F0F11] p-12 lg:p-20 text-center">
          <div className="relative space-y-8">
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#D4AF37] uppercase">
              Begin the Conversation
            </p>
            <h2 className="font-display font-extrabold text-4xl lg:text-6xl tracking-[-0.03em] text-[#F5F5F5] leading-tight text-balance max-w-2xl mx-auto">
              Wear a standard that
              <br />
              <span className="italic font-normal text-[#D4AF37]">endures</span>
            </h2>
            <p className="max-w-lg mx-auto text-[#B4B4BE] leading-relaxed">
              Reach out for order support, partnerships, or direct inquiries with NYVOR.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="mailto:nyvorcircle@gmail.com"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-[#D4AF37] text-[#0F0F11] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#F5F5F5] transition-all duration-300"
              >
                nyvorcircle@gmail.com
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#collections"
                className="px-8 py-4 rounded-full border border-[#2E2E36] bg-[#16161B] text-xs font-semibold tracking-[0.18em] uppercase text-[#F5F5F5] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
              >
                Browse Collections
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { title: 'Brand', links: ['About', 'Atelier', 'Collections', 'Contact'] },
    { title: 'Archive', links: ['Obsidian', 'Brume', 'Aurum', 'Vellum'] },
    { title: 'Connect', links: ['Journal', 'Instagram', 'Newsletter', 'Support'] },
  ];

  return (
    <footer className="border-t border-[#222227] bg-[#0F0F11] text-[#F5F5F5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full border border-[#D4AF37]/60 bg-[#16161B] flex items-center justify-center">
                <span className="font-display font-black text-sm text-[#D4AF37]">N</span>
              </div>
              <span className="font-display font-black text-lg tracking-[0.14em] text-[#F5F5F5] uppercase">NYVOR</span>
            </a>
            <p className="text-sm text-[#B4B4BE] leading-relaxed max-w-xs">
              A dark-mode unisex house focused on clean structure, sharp identity, and everyday confidence.
            </p>
            <p className="font-mono text-xs text-[#8A8A94]">
              Customer Support: nyvorcircle@gmail.com · +91 79829 03153
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="lg:col-span-2 space-y-4">
              <p className="font-mono text-[10px] tracking-[0.22em] text-[#D4AF37] uppercase">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#B4B4BE] hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2 space-y-4">
            <p className="font-mono text-[10px] tracking-[0.22em] text-[#D4AF37] uppercase">
              Newsletter
            </p>
            <p className="text-sm text-[#B4B4BE] leading-relaxed">
              Occasional dispatches. No noise.
            </p>
            <div className="flex border border-[#2E2E36] bg-[#16161B] overflow-hidden">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-transparent px-3 py-2 text-sm text-[#F5F5F5] placeholder:text-[#777780] focus:outline-none"
              />
              <button className="px-3 border-l border-[#2E2E36] bg-[#D4AF37] text-[#0F0F11] hover:bg-[#F5F5F5] transition-colors duration-300">
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#222227]">
          <p className="text-xs text-[#8A8A94] font-mono">
            © 2026 NYVOR · All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#8A8A94] hover:text-[#D4AF37] transition-colors">Privacy</a>
            <a href="#" className="text-xs text-[#8A8A94] hover:text-[#D4AF37] transition-colors">Terms</a>
            <a href="#" className="text-xs text-[#8A8A94] hover:text-[#D4AF37] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
