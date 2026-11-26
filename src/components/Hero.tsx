import React from "react";
import { ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToShop = () => {
    const el = document.getElementById("shop") || document.getElementById("collection") || document.querySelector("[data-catalogue-grid]");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openDarkCatalogue = () => {
    window.dispatchEvent(new CustomEvent("nyvor:select-catalogue", { detail: "Dark Catalogue" }));
    scrollToShop();
  };

  return (
    <section className="w-full bg-[#0F0F11] text-[#F5F5F5] px-4 sm:px-8 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white">
            NYVOR
          </h1>
          <p className="mt-1.5 text-lg sm:text-xl font-medium text-[#D4AF37]">
            Beyond Elegance.
          </p>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#D4D4D8]">
            Refined dark-mode silhouettes crafted for modern presence, clean structure, and lasting everyday authority.
          </p>
        </div>

        <div className="relative w-full overflow-hidden border border-[#2A2A32] bg-[#141417]">
          <img
            src="https://ppytshpklerjdnkljqag.supabase.co/storage/v1/object/public/secondary%20mockups/NYVOR_campaign_2000px.png"
            alt="NYVOR Editorial Campaign"
            className="w-full aspect-[1080/1350] object-cover object-center block"
          />

          <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#0F0F11]/85 backdrop-blur-sm border border-[#2A2A32]">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#D4AF37] uppercase">
              CAMPAIGN · 01
            </span>
          </div>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-2 pointer-events-none">
            <button
              type="button"
              onClick={scrollToShop}
              className="pointer-events-auto w-full sm:w-[48%] flex items-center justify-between px-3 py-2 bg-[#0F0F11]/90 hover:bg-[#D4AF37] text-[#F5F5F5] hover:text-[#0F0F11] border border-[#D4AF37]/75 backdrop-blur-sm transition-all duration-200 cursor-pointer"
            >
              <span className="text-[10px] font-semibold tracking-[0.14em] uppercase truncate">
                SHOP THE COLLECTION
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-2" />
            </button>

            <div className="pointer-events-auto w-full sm:w-[48%] flex flex-col items-stretch">
              <button
                type="button"
                onClick={openDarkCatalogue}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#0F0F11]/90 hover:bg-[#D4AF37] text-[#F5F5F5] hover:text-[#0F0F11] border border-[#D4AF37]/75 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase truncate">
                  DARK CATALOGUE
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-2" />
              </button>
              <span className="mt-1 font-mono text-[9px] tracking-[0.18em] uppercase text-[#D4AF37] drop-shadow">
                NEW CATALOGUE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
