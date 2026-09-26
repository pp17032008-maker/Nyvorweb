import { useState, useEffect } from 'react';
import { ArrowUpRight, Plus, Minus, Check } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-base/90 backdrop-blur-xl border-hairline-b'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative h-7 w-7 border-hairline rounded-sm flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
              <span className="font-display text-sm text-gold relative">N</span>
            </div>
            <span className="font-display text-lg tracking-tight text-accent">
              Noir
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-4 py-2 text-sm text-accent-muted hover:text-accent transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-gold/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="group flex items-center gap-1.5 px-5 py-2 text-sm text-ink-base bg-accent hover:bg-white transition-all duration-300 rounded-sm"
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
            <span className={`h-px w-6 bg-accent transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-px w-6 bg-accent transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-px w-6 bg-accent transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-hairline-t pb-6 pt-4 space-y-1">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm text-accent-muted hover:text-accent hover:bg-ink-raised transition-colors rounded-sm"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 mt-2 text-sm text-ink-base bg-accent text-center rounded-sm"
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
    <section id="overview" className="relative min-h-screen flex items-center pt-16 grain overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-gold/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 border-hairline rounded-full opacity-0 animate-fade-up"
              style={{ animationDelay: '0ms' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-shimmer" />
              <span className="text-xs tracking-wide-label text-accent-muted uppercase">
                Autumn / Winter 2026
              </span>
            </div>

            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] tracking-ultra-tight text-balance opacity-0 animate-fade-up"
              style={{ animationDelay: '100ms' }}
            >
              The art of
              <br />
              <span className="text-gradient-gold italic">restraint</span>
              <span className="text-accent">.</span>
            </h1>

            <p
              className="max-w-xl text-lg text-accent-muted leading-[1.6] opacity-0 animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              A considered approach to design, where every element serves a purpose
              and every detail is deliberate. Crafted for those who understand that
              true luxury whispers.
            </p>

            <div
              className="flex flex-wrap items-center gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <a
                href="#collections"
                className="group flex items-center gap-2 px-7 py-3.5 bg-accent text-ink-base text-sm font-medium rounded-sm hover:bg-white transition-all duration-300"
              >
                Explore Collections
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#atelier"
                className="group flex items-center gap-2 px-7 py-3.5 border-hairline text-sm text-accent hover:bg-ink-raised transition-all duration-300 rounded-sm"
              >
                Visit the Atelier
              </a>
            </div>
          </div>

          <div
            className="lg:col-span-5 opacity-0 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <div className="relative aspect-[4/5] border-hairline rounded-sm overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-ink-raised via-ink-overlay to-ink-base" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-base/80 via-transparent to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs tracking-wide-label text-accent-dim uppercase">
                      Edition
                    </p>
                    <p className="font-mono text-sm text-accent-muted">No. 001 / 100</p>
                  </div>
                  <div className="h-10 w-10 border-hairline rounded-sm flex items-center justify-center">
                    <span className="font-display text-sm text-gold">N</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-px w-12 bg-gold/40" />
                  <p className="font-display text-2xl text-accent leading-tight">
                    Obsidian
                    <br />
                    Series
                  </p>
                  <p className="text-xs text-accent-dim tracking-wide uppercase">
                    Hand-finished · Limited
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </div>

        <div
          className="mt-20 lg:mt-32 grid grid-cols-2 md:grid-cols-4 border-hairline-t border-hairline-l opacity-0 animate-fade-up"
          style={{ animationDelay: '500ms' }}
        >
          {[
            { label: 'Est.', value: 'MMXIX' },
            { label: 'Pieces', value: '124' },
            { label: 'Ateliers', value: '03' },
            { label: 'Artisans', value: '28' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border-hairline-r border-hairline-b p-6 lg:p-8 group hover:bg-ink-raised transition-colors duration-300"
            >
              <p className="text-xs tracking-wide-label text-accent-dim uppercase mb-3">
                {stat.label}
              </p>
              <p className="font-display text-2xl lg:text-3xl text-accent tracking-tight group-hover:text-gold transition-colors duration-300">
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
      desc: 'Volcanic textures meet architectural silhouettes.',
      tag: 'Sculptural',
      pieces: '32 pieces',
    },
    {
      name: 'Brume',
      desc: 'Soft gradients and diffused light in monochrome.',
      tag: 'Atmospheric',
      pieces: '18 pieces',
    },
    {
      name: 'Aurum',
      desc: 'Gold leaf accents on midnight foundations.',
      tag: 'Gilded',
      pieces: '24 pieces',
    },
    {
      name: 'Vellum',
      desc: 'Raw textures and natural fibers, unbleached.',
      tag: 'Organic',
      pieces: '50 pieces',
    },
  ];

  return (
    <section id="collections" className="relative py-24 lg:py-32 border-hairline-t">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <p className="text-xs tracking-wide-label text-gold uppercase">
              Selected Work
            </p>
            <h2 className="font-display text-4xl lg:text-5xl tracking-ultra-tight text-accent">
              Collections
            </h2>
          </div>
          <p className="max-w-md text-accent-muted leading-relaxed">
            Four distinct narratives, each exploring the tension between
            permanence and impermanence through material and form.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-line border-hairline rounded-sm overflow-hidden">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="group bg-ink-base p-8 lg:p-10 hover:bg-ink-raised transition-colors duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />

              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-xs text-accent-dim">
                  0{i + 1}
                </span>
                <span className="text-xs tracking-wide-label text-accent-dim uppercase border-hairline px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>

              <div className="aspect-[16/10] mb-8 border-hairline rounded-sm overflow-hidden relative bg-gradient-to-br from-ink-overlay to-ink-base">
                <div
                  className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at ${30 + i * 15}% ${40 + i * 10}%, rgba(201,169,97,0.08), transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl text-accent/5 group-hover:text-accent/10 transition-all duration-700 group-hover:scale-110">
                    {item.name}
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-accent tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-sm text-accent-muted leading-relaxed max-w-xs">
                    {item.desc}
                  </p>
                  <p className="text-xs text-accent-dim font-mono pt-2">
                    {item.pieces}
                  </p>
                </div>
                <div className="h-10 w-10 border-hairline rounded-sm flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 text-accent-muted group-hover:text-ink-base transition-colors duration-300" />
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
      title: 'Consultation',
      desc: 'A private dialogue to understand intent, aesthetic, and the constraints that define the work.',
    },
    {
      num: '02',
      title: 'Composition',
      desc: 'Each element is positioned with intention. Nothing is accidental; nothing is surplus.',
    },
    {
      num: '03',
      title: 'Craft',
      desc: 'Hand-executed by master artisans in our ateliers, with techniques refined over decades.',
    },
    {
      num: '04',
      title: 'Delivery',
      desc: 'Presented in archival packaging, accompanied by a signed certificate of authenticity.',
    },
  ];

  return (
    <section id="atelier" className="relative py-24 lg:py-32 border-hairline-t">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-6">
            <p className="text-xs tracking-wide-label text-gold uppercase">
              The Process
            </p>
            <h2 className="font-display text-4xl lg:text-5xl tracking-ultra-tight text-accent leading-tight">
              From concept
              <br />
              to <span className="text-gradient-gold italic">heirloom</span>
            </h2>
            <p className="text-accent-muted leading-relaxed">
              Every piece follows a deliberate path — four stages that transform
              raw intention into an object of lasting value.
            </p>
            <div className="pt-4 border-hairline-t">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase pt-4">
                Average Timeline
              </p>
              <p className="font-display text-3xl text-accent mt-2">12 weeks</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-px bg-line border-hairline rounded-sm overflow-hidden">
            {steps.map((step) => (
              <div
                key={step.num}
                className="group bg-ink-base p-8 lg:p-10 hover:bg-ink-raised transition-colors duration-500"
              >
                <div className="flex items-start gap-8">
                  <span className="font-mono text-sm text-gold/60 group-hover:text-gold transition-colors duration-300 pt-1">
                    {step.num}
                  </span>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-display text-2xl text-accent tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-accent-muted leading-relaxed max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                  <div className="h-8 w-8 border-hairline rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Plus className="h-3.5 w-3.5 text-accent-muted" />
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
      name: 'Essential',
      price: '€2,400',
      period: 'per piece',
      desc: 'A single commissioned work, crafted to specification.',
      features: [
        'One-on-one consultation',
        'Material selection from core palette',
        'Hand-finished by a single artisan',
        'Archival presentation box',
      ],
      featured: false,
    },
    {
      name: 'Signature',
      price: '€8,900',
      period: 'per collection',
      desc: 'A coordinated set of three to five pieces.',
      features: [
        'Everything in Essential',
        'Bespoke material sourcing',
        'Master artisan assignment',
        'Signed certificate of authenticity',
        'Priority atelier access',
        'Annual condition review',
      ],
      featured: true,
    },
    {
      name: 'Heritage',
      price: 'By request',
      period: 'commissioned',
      desc: 'A complete environment, conceived and executed as one.',
      features: [
        'Everything in Signature',
        'Full spatial consultation',
        'Dedicated artisan team',
        'Lifetime restoration guarantee',
        'Provenance documentation',
      ],
      featured: false,
    },
  ];

  return (
    <section id="journal" className="relative py-24 lg:py-32 border-hairline-t">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center space-y-4 mb-16">
          <p className="text-xs tracking-wide-label text-gold uppercase">
            Commission
          </p>
          <h2 className="font-display text-4xl lg:text-5xl tracking-ultra-tight text-accent">
            Three levels of engagement
          </h2>
          <p className="max-w-xl mx-auto text-accent-muted leading-relaxed">
            Each tier is a commitment to craft. Pricing reflects materials,
            time, and the number of artisans involved.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-line border-hairline rounded-sm overflow-hidden">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 lg:p-10 transition-colors duration-500 ${
                tier.featured
                  ? 'bg-ink-overlay glow-gold'
                  : 'bg-ink-base hover:bg-ink-raised'
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="px-4 py-1 bg-gold text-ink-base text-xs tracking-wide-label uppercase rounded-full font-medium">
                    Most Chosen
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-accent tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-accent-muted leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-hairline-t">
                  <span className="font-display text-4xl text-accent tracking-tight pt-4">
                    {tier.price}
                  </span>
                  <span className="text-xs text-accent-dim tracking-wide uppercase">
                    {tier.period}
                  </span>
                </div>

                <ul className="space-y-3 pt-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-accent-muted leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-3.5 text-sm rounded-sm transition-all duration-300 ${
                    tier.featured
                      ? 'bg-gold text-ink-base hover:bg-gold-soft font-medium'
                      : 'border-hairline text-accent hover:bg-ink-hover'
                  }`}
                >
                  Inquire
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
      q: 'What is the typical commission timeline?',
      a: 'From initial consultation to delivery, the average piece takes twelve weeks. Larger collections and heritage commissions may extend to six months or more, depending on material sourcing and complexity.',
    },
    {
      q: 'Can I request specific materials or techniques?',
      a: 'Absolutely. Material sourcing is a core part of the consultation process. We work with a curated network of suppliers for rare and archival materials, and our artisans are versed in both traditional and contemporary techniques.',
    },
    {
      q: 'Do you offer restoration or maintenance?',
      a: 'Every Signature and Heritage commission includes an annual condition review and a lifetime restoration guarantee. Essential pieces can be enrolled in our care program at any time.',
    },
    {
      q: 'Are the pieces truly limited?',
      a: 'Each collection is produced in a fixed edition. Once the edition is complete, the molds, plates, and source materials are retired. A signed certificate of authenticity accompanies every piece with its edition number.',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 border-hairline-t">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center space-y-4 mb-16">
          <p className="text-xs tracking-wide-label text-gold uppercase">
            Considered
          </p>
          <h2 className="font-display text-4xl lg:text-5xl tracking-ultra-tight text-accent">
            Questions
          </h2>
        </div>

        <div className="space-y-px bg-line border-hairline rounded-sm overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-ink-base">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 lg:p-7 text-left hover:bg-ink-raised transition-colors duration-300 group"
              >
                <span className="font-display text-lg text-accent tracking-tight pr-4">
                  {faq.q}
                </span>
                <div className="h-8 w-8 border-hairline rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-gold/40 transition-colors duration-300">
                  {open === i ? (
                    <Minus className="h-4 w-4 text-gold" />
                  ) : (
                    <Plus className="h-4 w-4 text-accent-muted" />
                  )}
                </div>
              </button>
              <div
                className={`grid transition-all duration-500 ease-out ${
                  open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 lg:px-7 pb-6 lg:pb-7 text-accent-muted leading-relaxed">
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

export function CTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 border-hairline-t grain">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative border-hairline rounded-sm overflow-hidden p-12 lg:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-ink-raised via-ink-base to-ink-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[100px]" />

          <div className="relative space-y-8">
            <p className="text-xs tracking-wide-label text-gold uppercase">
              Begin the Conversation
            </p>
            <h2 className="font-display text-4xl lg:text-6xl tracking-ultra-tight text-accent leading-tight text-balance max-w-2xl mx-auto">
              Commission a piece that
              <br />
              <span className="text-gradient-gold italic">endures</span>
            </h2>
            <p className="max-w-lg mx-auto text-accent-muted leading-relaxed">
              Every great work begins with a conversation. Share your vision,
              and we will respond within two business days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="mailto:atelier@noir.studio"
                className="group flex items-center gap-2 px-8 py-4 bg-accent text-ink-base text-sm font-medium rounded-sm hover:bg-white transition-all duration-300"
              >
                atelier@noir.studio
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#collections"
                className="px-8 py-4 border-hairline text-sm text-accent hover:bg-ink-raised transition-all duration-300 rounded-sm"
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
    { title: 'Studio', links: ['About', 'Atelier', 'Artisans', 'Press'] },
    { title: 'Collections', links: ['Obsidian', 'Brume', 'Aurum', 'Vellum'] },
    { title: 'Connect', links: ['Journal', 'Instagram', 'Newsletter', 'Contact'] },
  ];

  return (
    <footer className="border-hairline-t">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="flex items-center gap-2.5">
              <div className="h-7 w-7 border-hairline rounded-sm flex items-center justify-center">
                <span className="font-display text-sm text-gold">N</span>
              </div>
              <span className="font-display text-lg text-accent">Noir</span>
            </a>
            <p className="text-sm text-accent-muted leading-relaxed max-w-xs">
              A house of considered design, founded on the principle that true
              luxury is restraint.
            </p>
            <p className="font-mono text-xs text-accent-dim">
              48° 51′ 24″ N · 2° 21′ 03″ E
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="lg:col-span-2 space-y-4">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-accent-muted hover:text-gold transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs tracking-wide-label text-accent-dim uppercase">
              Newsletter
            </p>
            <p className="text-sm text-accent-muted leading-relaxed">
              Occasional dispatches. No noise.
            </p>
            <div className="flex border-hairline rounded-sm overflow-hidden">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-transparent px-3 py-2 text-sm text-accent placeholder:text-accent-dim focus:outline-none"
              />
              <button className="px-3 border-hairline-l hover:bg-ink-raised transition-colors duration-300">
                <ArrowUpRight className="h-4 w-4 text-accent-muted" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-hairline-t">
          <p className="text-xs text-accent-dim font-mono">
            © 2026 Noir Atelier · All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-accent-dim hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="text-xs text-accent-dim hover:text-accent transition-colors">Terms</a>
            <a href="#" className="text-xs text-accent-dim hover:text-accent transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
