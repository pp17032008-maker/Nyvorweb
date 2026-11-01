export function FootwearTeaser() {
  return (
    <section className="relative py-24 lg:py-32 border-hairline-t overflow-hidden grain">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-8">
        <div className="relative border-hairline rounded-sm overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-ink-raised via-ink-base to-black" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand/[0.04] blur-[120px]" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center p-10 lg:p-20 min-h-[500px]">
            {/* Text */}
            <div className="space-y-6 z-10">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border-hairline rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
                <span className="text-xs tracking-wide-label text-accent-muted uppercase">
                  Coming Soon
                </span>
              </div>

              <h2 className="font-display text-4xl lg:text-6xl tracking-ultra-tight text-accent leading-[0.95]">
                NYVOR FOOTWEAR
                <br />
                <span className="text-brand">// SOON</span>
              </h2>

              <p className="text-base lg:text-lg text-accent-muted leading-relaxed max-w-md">
                The next chapter. Precision-engineered silhouettes. Premium materials.
                Built on the same density-first philosophy. Sign up to be first in line.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-ink-base border-hairline px-5 py-3.5 text-sm text-accent placeholder:text-accent-dim focus:outline-none focus:border-brand/50 transition-colors rounded-sm"
                />
                <button className="px-7 py-3.5 bg-accent text-ink-base text-sm font-semibold tracking-wide-label uppercase rounded-sm hover:bg-white transition-colors duration-300">
                  Notify Me
                </button>
              </div>
            </div>

            {/* Silhouette mockup */}
            <div className="relative aspect-square lg:aspect-[4/3] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[4/3] group">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-brand/5 blur-[60px] group-hover:bg-brand/10 transition-colors duration-700" />

                  {/* Shoe image */}
                  <img
                    src="https://images.pexels.com/photos/8248712/pexels-photo-8248712.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Nyvor footwear teaser"
                    className="relative w-full h-full object-cover rounded-sm border-hairline opacity-60 group-hover:opacity-80 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-base/80 via-transparent to-transparent rounded-sm" />

                  {/* Overlay text */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="font-mono text-[10px] text-accent-dim">PROTOTYPE // V1</p>
                      <p className="font-display text-lg text-accent mt-1">SILHOUETTE 01</p>
                    </div>
                    <span className="text-[10px] tracking-wide-label text-brand uppercase">
                      Classified
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 h-6 w-6 border-l border-t border-line-strong" />
              <div className="absolute top-0 right-0 h-6 w-6 border-r border-t border-line-strong" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-l border-b border-line-strong" />
              <div className="absolute bottom-0 right-0 h-6 w-6 border-r border-b border-line-strong" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
