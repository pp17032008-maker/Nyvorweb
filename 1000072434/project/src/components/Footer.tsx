import { ArrowUpRight, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const cols = [
    {
      title: 'Shop',
      links: ['New Arrivals', 'T-Shirts', 'Hoodies', 'Jackets', 'Denim', 'Sale'],
    },
    {
      title: 'Support',
      links: ['Shipping Info', 'Returns & Exchanges', 'Size Guide', 'Track Order', 'FAQs', 'Contact Us'],
    },
    {
      title: 'Brand',
      links: ['Brand Story', 'Sustainability', 'Atelier', 'Careers', 'Press', 'Stockists'],
    },
  ];

  return (
    <footer className="border-hairline-t bg-ink-base">
      {/* Main footer */}
      <div className="mx-auto max-w-[1600px] px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-3 space-y-5">
            <span className="font-display text-3xl tracking-ultra-tight text-accent">NYVOR</span>
            <p className="text-sm text-accent-muted leading-relaxed max-w-xs">
              Contemporary fashion and lifestyle. Designed for individuality, comfort, and lasting quality.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 border-hairline rounded-sm flex items-center justify-center text-accent-muted hover:text-accent hover:border-brand/40 hover:bg-ink-raised transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
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
                      className="group inline-flex items-center gap-1 text-sm text-accent-muted hover:text-accent transition-colors duration-300"
                    >
                      {link}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs tracking-wide-label text-accent-dim uppercase">
              Customer Support
            </p>
            <div className="space-y-2 text-sm text-accent-muted">
              <p>Mon–Sat · 10AM–7PM IST</p>
              <a href="mailto:nyvorcircle@gmail.com" className="block hover:text-accent transition-colors">
                nyvorcircle@gmail.com
              </a>
              <a href="tel:+917982903153" className="block hover:text-accent transition-colors">
                +91 79829 03153
              </a>
            </div>
            <div className="pt-3 space-y-2">
              <p className="text-xs text-accent-dim">We ship across India</p>
              <div className="flex gap-2">
                {['UPI', 'COD', 'Cards'].map((method) => (
                  <span key={method} className="px-2.5 py-1 border-hairline text-[10px] tracking-wide-label text-accent-dim uppercase rounded-sm">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-hairline-t">
          <p className="text-xs text-accent-dim font-mono">
            Founder — Priyanshu Pandey
          </p>
          <p className="text-xs text-accent-dim font-mono">
            © 2026 NYVOR. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-accent-dim hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-accent-dim hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-accent-dim hover:text-accent transition-colors">Cookies</a>
          </div>
          <p className="text-xs text-accent-dim font-mono">
            Made in India // Built for the Culture
          </p>
        </div>
      </div>
    </footer>
  );
}
