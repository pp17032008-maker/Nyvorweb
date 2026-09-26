import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grain pt-28">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7955544/pexels-photo-7955544.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Streetwear editorial"
          className="h-full w-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-base via-ink-base/60 to-ink-base/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-base/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative w-full mx-auto max-w-[1600px] px-5 lg:px-8">
        <div className="max-w-4xl space-y-8">
        <h1  
  className="font-sans font-extrabold text-hero text-accent opacity-0 animate-fade-up leading-[0.9] uppercase"  
  style={{ animationDelay: '100ms' }}  
>  
  NYVOR  
</h1> 
          <p  
  className="font-mono font-medium text-2xl lg:text-4xl text-brand tracking-tight opacity-0 animate-fade-up"  
  style={{ animationDelay: '200ms' }}  
>  
  Beyond Elegance.  
</p>  

          <p
            className="text-lg lg:text-xl text-accent-muted leading-relaxed max-w-xl opacity-0 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            Contemporary fashion designed for individuality, comfort, and lasting quality.
          </p>

          <div
            className="flex flex-col sm:flex-row items-start gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <a
              href="#shop"
              className="group flex items-center gap-3 px-8 py-4 bg-accent text-ink-base text-sm font-semibold tracking-wide-label uppercase rounded-sm hover:bg-white transition-all duration-300"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-5 lg:right-8 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: '700ms' }}
        >
          <span className="text-[10px] tracking-wide-label text-accent-dim uppercase rotate-90 origin-center translate-y-8">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
