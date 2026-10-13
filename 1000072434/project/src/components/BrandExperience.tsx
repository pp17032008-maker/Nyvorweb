import { Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BrandExperience() {
  const principles = [
    { title: 'QUALITY', desc: 'Products developed with attention to materials, construction, fit, and finishing.' },
    { title: 'DESIGN', desc: 'Contemporary aesthetics created to develop a recognizable NYVOR identity.' },
    { title: 'INDIVIDUALITY', desc: 'Fashion that allows people to express their own personality rather than simply follow everyone else.' },
    { title: 'AMBITION', desc: 'A mindset of constantly improving, creating, and moving forward.' },
    { title: 'INNOVATION', desc: 'Exploring new ideas in design, products, technology, and the way fashion is experienced.' },
    { title: 'CONSISTENCY', desc: 'Building trust by maintaining standards across products and collections.' },
  ];

  const standards = [
    { title: 'DESIGN', desc: 'NYVOR follows a contemporary design philosophy that combines minimalism, streetwear, sophistication, and individuality. Our collections are intended to remain visually distinctive while being versatile enough for everyday life.' },
    { title: 'QUALITY', desc: 'Quality is one of the fundamental principles behind NYVOR. We aim to carefully evaluate materials, construction, stitching, printing or embroidery, fit, finishing, and durability so that the product experience matches the identity of the brand.' },
    { title: 'COMFORT', desc: 'Fashion should not come at the expense of comfort. NYVOR products are developed with everyday wear in mind, balancing visual structure with practical comfort and usability.' },
    { title: 'IDENTITY', desc: 'We want NYVOR to develop a recognizable visual language. Rather than constantly following short-lived trends, we aim to create designs that establish their own character and evolve naturally from collection to collection.' },
    { title: 'PREMIUM EXPERIENCE', desc: "Premium fashion is not limited to the garment itself. NYVOR's approach extends to product presentation, packaging, communication, website experience, customer service, and attention to detail." },
  ];

  return (
    <div id="brand-experience" className="border-hairline-t">
      {/* ============================================ */}
      {/* 1. NYVOR Introduction                        */}
      {/* ============================================ */}
      <section id="discover" className="relative py-24 lg:py-36 overflow-hidden grain border-hairline-b">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-brand/[0.04] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-brand/[0.03] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1600px] px-5 lg:px-8 w-full">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border-hairline rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
              <span className="text-xs tracking-wide-label text-accent-muted uppercase">
                Discover NYVOR
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[6rem] leading-[0.95] tracking-ultra-tight text-accent">
              NYVOR
            </h1>

            <p className="font-display text-2xl lg:text-3xl text-brand tracking-tight">
              Define Your Identity.
            </p>

            <div className="space-y-5 pt-2">
              <p className="text-lg text-accent-muted leading-[1.7] max-w-2xl">
                NYVOR is a contemporary fashion and lifestyle brand created for people who see clothing as an expression of identity, ambition, confidence, and individuality.
              </p>
              <p className="text-base text-accent-muted leading-[1.7] max-w-2xl">
                We create modern fashion designed to bring together premium aesthetics, comfort, distinctive design, and everyday versatility.
              </p>
              <p className="text-base text-accent-muted leading-[1.7] max-w-2xl">
                Our initial focus is on premium streetwear, with carefully developed sweatshirts, followed by an expanding range of contemporary apparel and lifestyle products.
              </p>
              <p className="text-base text-accent-muted leading-[1.7] max-w-2xl">
                NYVOR is designed for a generation that values individuality and wants clothing that feels refined without losing its edge.
              </p>
              <p className="text-base text-accent-muted leading-[1.7] max-w-2xl">
                We are building NYVOR with a global perspective — originating from India and aspiring to reach people across the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. The Beginning                            */}
      {/* ============================================ */}
      <section id="beginning" className="relative py-24 lg:py-32 border-hairline-b">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-4">
              <p className="text-xs tracking-wide-label text-brand uppercase">Origins</p>
              <h2 className="font-display text-4xl lg:text-5xl tracking-ultra-tight text-accent leading-tight">
                THE BEGINNING
              </h2>
              <div className="h-px w-16 bg-brand/40" />
            </div>

            <div className="lg:col-span-8 space-y-6">
              {[
                'NYVOR began in a single room, with a single person and a clear ambition: to build a fashion company capable of delivering quality products to people around the world.',
                'It began with an idea, determination, and a belief that a meaningful brand can be built from humble beginnings.',
                'There was no large headquarters, massive team, or established infrastructure — only the commitment to create something that could grow beyond its starting point.',
                'The first objective was never simply to sell clothing. It was to establish a name, identity, and standard that could become meaningful over time.',
                'Every decision, from the first concept to the development of each collection, is part of that journey.',
                'NYVOR is being built step by step — with patience, experimentation, learning, and continuous improvement.',
                'What began as an ambition is being developed into a long-term fashion company.',
                'And this is only the beginning.',
              ].map((paragraph, i) => (
                <p
                  key={i}
                  className={`leading-[1.7] ${i === 0 ? 'text-xl text-accent font-medium' : 'text-base text-accent-muted'}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 3. About NYVOR + Standards                  */}
      {/* ============================================ */}
      <section id="about" className="relative py-24 lg:py-32 border-hairline-b bg-ink-raised/30">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-8">
          <div className="mb-16 space-y-4">
            <p className="text-xs tracking-wide-label text-brand uppercase">The Brand</p>
            <h2 className="font-display text-4xl lg:text-5xl tracking-ultra-tight text-accent">
              ABOUT NYVOR
            </h2>
            <p className="text-lg text-accent-muted leading-[1.7] max-w-2xl">
              NYVOR is built around the belief that modern fashion should combine aesthetic appeal with substance.
            </p>
            <p className="text-base text-accent-muted leading-[1.7] max-w-2xl">
              Our approach goes beyond simply placing a logo on clothing. We focus on creating products with a complete identity — from the silhouette and fabric to the graphics, branding, packaging, presentation, and overall customer experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border-hairline rounded-sm overflow-hidden">
            {standards.map((item) => (
              <div
                key={item.title}
                className="group bg-ink-base p-8 lg:p-10 hover:bg-ink-raised transition-colors duration-500 relative"
              >
                <div className="absolute top-0 left-0 h-px w-0 bg-brand group-hover:w-full transition-all duration-700" />
                <h3 className="font-display text-xl text-accent tracking-tight mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-accent-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4. Continuous Evolution — Product Categories */}
      {/* ============================================ */}
      <section id="products" className="relative py-24 lg:py-32 border-hairline-b">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs tracking-wide-label text-brand uppercase">Growth</p>
              <h2 className="font-display text-4xl lg:text-5xl tracking-ultra-tight text-accent leading-tight">
                CONTINUOUS<br />EVOLUTION
              </h2>
              <p className="text-base text-accent-muted leading-[1.7]">
                NYVOR is designed to evolve. Our long-term product vision can expand across:
              </p>
              <p className="text-xs text-accent-dim leading-relaxed">
                Every new category will be approached with the same emphasis on design, quality, functionality, and consistency.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border-hairline rounded-sm overflow-hidden">
                {['SWEATSHIRTS', 'HOODIES', 'T-SHIRTS', 'JOGGERS', 'JACKETS', 'SNEAKERS', 'ACCESSORIES', 'LIFESTYLE PRODUCTS'].map((cat) => (
                  <div
                    key={cat}
                    className="bg-ink-base p-5 lg:p-6 text-center group hover:bg-ink-raised transition-colors duration-300 relative"
                  >
                    <div className="absolute top-0 left-0 h-px w-0 bg-brand group-hover:w-full transition-all duration-700" />
                    <p className="text-xs sm:text-sm font-display text-accent tracking-wide-label group-hover:text-brand transition-colors duration-300">
                      {cat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* ============================================ */}
      {/* 6. Our Customers                            */}
      {/* ============================================ */}
      <section id="customers" className="relative py-24 lg:py-32 border-hairline-b">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center space-y-6">
          <p className="text-xs tracking-wide-label text-brand uppercase">Community</p>
          <h2 className="font-display text-4xl lg:text-5xl tracking-ultra-tight text-accent leading-tight">
            OUR CUSTOMERS
          </h2>
          <div className="h-px w-16 bg-brand/40 mx-auto" />
          <p className="text-lg text-accent-muted leading-[1.7]">
            NYVOR is created for individuals who appreciate modern fashion, streetwear, quality, and distinctive personal style.
          </p>
          <p className="text-base text-accent-muted leading-[1.7]">
            Our audience includes young people, students, creators, athletes, entrepreneurs, professionals, and anyone who wants their clothing to reflect a confident and contemporary identity.
          </p>
          <p className="text-base text-accent-muted leading-[1.7]">
            NYVOR is not intended to define how someone should look.
          </p>
          <p className="font-display text-2xl lg:text-3xl text-accent tracking-tight">
            It is designed to give people another way to define themselves.
          </p>
        </div>
      </section>

     

      {/* ============================================ */}
      {/* 8. Official Contact                         */}
      {/* ============================================ */}
      <section id="contact-info" className="relative py-24 lg:py-32 border-hairline-b bg-ink-raised/30 grain">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="text-center space-y-8">
            <p className="text-xs tracking-wide-label text-brand uppercase">Get in Touch</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-ultra-tight text-accent">
              OFFICIAL CONTACT
            </h2>
            <div className="h-px w-16 bg-brand/40 mx-auto" />

            <div className="grid sm:grid-cols-2 gap-px bg-line border-hairline rounded-sm overflow-hidden">
              <a
                href="mailto:nyvorcircle@gmail.com"
                className="group bg-ink-base p-8 lg:p-10 hover:bg-ink-raised transition-colors duration-500 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 border-hairline rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-brand/40 group-hover:bg-brand/5 transition-all duration-300">
                    <Mail className="h-5 w-5 text-accent-muted group-hover:text-brand transition-colors duration-300" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs tracking-wide-label text-accent-dim uppercase">Email</p>
                    <p className="text-base text-accent font-medium break-all">nyvorcircle@gmail.com</p>
                  </div>
                </div>
              </a>

              <a
                href="tel:+917982903153"
                className="group bg-ink-base p-8 lg:p-10 hover:bg-ink-raised transition-colors duration-500 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 border-hairline rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-brand/40 group-hover:bg-brand/5 transition-all duration-300">
                    <Phone className="h-5 w-5 text-accent-muted group-hover:text-brand transition-colors duration-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs tracking-wide-label text-accent-dim uppercase">Phone</p>
                    <p className="text-base text-accent font-medium">+91 7982903153</p>
                  </div>
                </div>
              </a>
            </div>

            <p className="text-sm text-accent-muted leading-relaxed max-w-xl mx-auto pt-4">
              For customer support, wholesale enquiries, retail partnerships, collaborations, business proposals, media enquiries, and other official matters, customers can contact NYVOR through the official channels above.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 10. Founder + Closing                       */}
      {/* ============================================ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-brand/[0.03] blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-2xl px-5 lg:px-8 text-center space-y-12">
          <div className="space-y-4 pt-8">
            <h2 className="font-display text-6xl lg:text-8xl tracking-ultra-tight text-accent leading-[0.95]">
              NYVOR
            </h2>
            <p className="font-display text-2xl lg:text-3xl text-brand tracking-tight">
              Define Your Identity.
            </p>
          </div>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-ink-base text-sm font-semibold tracking-wide-label uppercase rounded-sm hover:bg-white transition-all duration-300"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
