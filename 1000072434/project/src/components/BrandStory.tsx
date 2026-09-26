export function BrandStory() {
  return (
    <section id="brand-story" className="relative py-24 lg:py-32 border-hairline-t overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] border-hairline rounded-sm overflow-hidden group">
              <img
                src="https://images.pexels.com/photos/4904473/pexels-photo-4904473.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Nyvor brand story"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-base/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[10px] text-accent-dim">EST. 2026</p>
                  <p className="font-display text-xl text-accent mt-1">Dehradun // India</p>
                </div>
                <span className="text-[10px] tracking-wide-label text-brand uppercase">Chapter 01</span>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-ink-raised border-hairline rounded-sm p-5 lg:p-6 max-w-[200px]">
              <p className="font-display text-3xl text-brand tracking-tight">Premium</p>
              <p className="text-xs text-accent-muted mt-1">Carefully selected fabrics. No compromises.</p>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs tracking-wide-label text-brand uppercase">
              The Philosophy
            </p>
            <h2 className="font-display text-4xl lg:text-5xl tracking-ultra-tight text-accent leading-[1.05]">
              QUALITY OVER<br />EVERYTHING.
            </h2>
            <div className="space-y-4 text-accent-muted leading-relaxed">
              <p>
                NYVOR was born from a simple frustration: streetwear in India deserved better.
                Better fabric. Better printing. Better construction. No thin cotton, no fading
                prints, no fast-fashion corners cut.
              </p>
              <p>
                Every piece is crafted with carefully selected fabrics that drape with weight and
                hold their shape wash after wash. Prints are applied with precision techniques
                that resist cracking, fading, and the slow death that kills lesser garments.
              </p>
              <p>
                We build for the culture. For those who understand that a tee isn't just a tee —
                it's a statement of intent.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-px bg-line border-hairline rounded-sm overflow-hidden pt-4">
              {[
                { label: 'Fabric', value: 'Premium' },
                { label: 'Prints', value: 'WFP*' },
                { label: 'Origin', value: 'India' },
              ].map((stat) => (
                <div key={stat.label} className="bg-ink-base p-4 lg:p-5">
                  <p className="text-[10px] tracking-wide-label text-accent-dim uppercase mb-2">
                    {stat.label}
                  </p>
                  <p className="font-display text-xl text-accent">{stat.value}</p>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-accent-dim font-mono pt-2">
              * Water-Based Flex Print — crack-resistant, fade-resistant, built to last.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
