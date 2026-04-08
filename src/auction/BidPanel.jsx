import { useState } from "react";

export default function BidPanel() {
  const [bid, setBid] = useState("48,405,000");

  return (
    <section className="lg:col-span-5 flex flex-col bg-surface-container border-x border-outline-variant/10 h-full">
      <div className="p-8 flex-1 flex flex-col justify-center items-center gap-12 text-center overflow-y-auto">
        <div className="space-y-2">
          <p className="text-label-md uppercase tracking-[0.3em] text-on-surface-variant">Current High Bid</p>
          <h2 className="text-7xl md:text-8xl font-bold tracking-tighter text-primary">
            <span className="text-3xl align-top mr-2 opacity-50 font-sans">$</span>
            {bid}
          </h2>
          <p className="text-on-surface-variant font-mono">Bidding increments: $50,000</p>
        </div>
        <div className="w-full max-w-md space-y-8">
          <div className="relative group">
            <label className="absolute -top-3 left-0 text-[10px] uppercase tracking-widest text-primary font-bold">
              Place Manual Bid
            </label>
            <input 
              className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-primary text-4xl font-bold py-4 px-0 outline-none transition-colors text-white" 
              type="text" 
              defaultValue="$48,455,000" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-surface-container-highest py-4 font-bold text-sm tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 uppercase">
              +$50k Bid
            </button>
            <button className="bg-surface-container-highest py-4 font-bold text-sm tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 uppercase">
              +$100k Bid
            </button>
          </div>
          <button className="w-full bg-primary text-on-primary py-6 text-xl font-extrabold uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]">
            Confirm Bid
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
          </button>
          <p className="text-[10px] text-outline uppercase tracking-widest leading-relaxed">
            By placing a bid, you agree to the Auctra Terms of Sale and confirm you have the necessary funds to complete the transaction upon victory.
          </p>
        </div>
      </div>
      <div className="p-4 bg-secondary-container/20 border-t border-outline-variant/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Live Auction Floor Active</span>
        </div>
        <div className="flex -space-x-2">
          <div className="w-6 h-6 bg-surface-container-highest border border-surface text-[8px] flex items-center justify-center font-bold text-on-surface">JD</div>
          <div className="w-6 h-6 bg-surface-container-highest border border-surface text-[8px] flex items-center justify-center font-bold text-on-surface">ML</div>
          <div className="w-6 h-6 bg-surface-container-highest border border-surface text-[8px] flex items-center justify-center font-bold text-on-surface">+14</div>
        </div>
      </div>
    </section>
  );
}