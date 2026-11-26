import React from "react";
import { ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToShop = () => {
    const el = document.getElementById("shop") || document.getElementById("collection") || document.querySelector("[data-catalogue-grid]");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const selectDarkCatalogue = () => {
    window.dispatchEvent(new CustomEvent("nyvor:select-catalogue", { detail: "Dark Catalogue" }));
    scrollToShop();
  };

  return (
    <section className="w-full bg-[#0F0F11] text-[#F5F5F5] px-4 sm:px-8 pt-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full h-[460px] sm:h-[580px] overflow-hidden border border-[#2A2A32] bg-[#141417]">
          <img
            src="/images/nyvor-campaign.png"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1400";
            }}
            alt="NYVOR Group Fashion Editorial Campaign"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#0F0F11]/85 backdrop-blur-md border border-[#2A2A32]">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase">
              CAMPAIGN · 01
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-2.5">
          <button
            type="button"
            onClick={scrollToShop}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-[#141417] hover:bg-[#D4AF37] text-[#F5F5F5] hover:text-[#0F0F11] border border-[#D4AF37]/60 hover:border-[#D4AF37] transition-all duration-200 group/btn cursor-pointer"
          >
            <div className="text-left">
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#D4AF37] group-hover/btn:text-[#0F0F11] uppercase">
                OBSIDIAN &amp; SIGNATURE CAPSULE
              </p>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase mt-0.5">
                SHOP THE COLLECTION
              </p>
            </div>
            <span className="h-7 w-7 rounded-full border border-current flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>

          <div>
            <button
              type="button"
              onClick={selectDarkCatalogue}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-[#141417] hover:bg-[#D4AF37] text-[#F5F5F5] hover:text-[#0F0F11] border border-[#D4AF37]/60 hover:border-[#D4AF37] transition-all duration-200 group/btn cursor-pointer"
            >
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase">
                DARK CATALOGUE
              </span>
              <span className="h-7 w-7 rounded-full border border-current flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
            <p className="mt-1 font-mono text-[9px] tracking-[0.2em] uppercase text-[#D4AF37]">
              NEW CATALOGUE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
