import { motion, AnimatePresence } from "framer-motion";

export default function BidPanel({ currentBid, leadingBidder, onPlaceBid, currentUser }) {
  const isLeading = leadingBidder === currentUser;
  
  const safeBid = Number.isFinite(Number(currentBid)) ? Number(currentBid) : 0;

  const formattedBid = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(safeBid);

  const inc10 = Math.floor(safeBid * 0.10);
  const inc20 = Math.floor(safeBid * 0.20);
  const inc50 = Math.floor(safeBid * 0.50);

  return (
    <section className="lg:col-span-5 flex flex-col bg-surface-container border-x border-outline-variant/10 h-full">
      <div className="p-8 flex-1 flex flex-col justify-center items-center gap-8 text-center overflow-y-auto">
        
        {/* Bid Feedback Banner */}
        <div className="min-h-[40px] w-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              {isLeading ? (
                <motion.div
                  key="leading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-green-500/10 text-green-400 border border-green-500/30 px-6 py-2 rounded-full uppercase tracking-widest text-xs font-bold shadow-[0_0_15px_rgba(34,197,94,0.15)] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  You are leading
                </motion.div>
              ) : (
                <motion.div
                  key="outbid"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-red-500/10 text-red-500 border border-red-500/30 px-6 py-2 rounded-full uppercase tracking-widest text-xs font-bold shadow-[0_0_15px_rgba(239,68,68,0.15)] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  You've been outbid
                </motion.div>
              )}
            </AnimatePresence>
        </div>

        <div className="space-y-2 w-full">
          <p className="text-label-md uppercase tracking-[0.3em] text-on-surface-variant">Current High Bid</p>
          <motion.h2 
            key={currentBid}
            initial={{ scale: 1.1, color: '#facc15' }}
            animate={{ scale: 1, color: '#eab308' }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-primary break-all px-4"
          >
            {formattedBid}
          </motion.h2>
        </div>

        <div className="w-full max-w-md space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onPlaceBid(inc10)} 
              className="bg-surface-container-highest py-6 font-bold text-lg tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 uppercase active:scale-95 border border-outline-variant/30 hover:border-primary flex flex-col items-center justify-center"
            >
              <span>+10%</span>
              <span className="text-[10px] font-normal text-stone-400">+{new Intl.NumberFormat('en-IN', {style: 'currency', currency:'INR', maximumFractionDigits:0}).format(inc10)}</span>
            </button>
            <button 
              onClick={() => onPlaceBid(inc20)} 
              className="bg-surface-container-highest py-6 font-bold text-lg tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 uppercase active:scale-95 border border-outline-variant/30 hover:border-primary flex flex-col items-center justify-center"
            >
              <span>+20%</span>
              <span className="text-[10px] font-normal text-stone-400">+{new Intl.NumberFormat('en-IN', {style: 'currency', currency:'INR', maximumFractionDigits:0}).format(inc20)}</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onPlaceBid(inc50)} 
              className="bg-surface-container-highest py-6 font-bold text-lg tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 uppercase active:scale-95 border border-outline-variant/30 hover:border-primary flex flex-col items-center justify-center"
            >
              <span>+50%</span>
              <span className="text-[10px] font-normal text-stone-400">+{new Intl.NumberFormat('en-IN', {style: 'currency', currency:'INR', maximumFractionDigits:0}).format(inc50)}</span>
            </button>
            <button 
              onClick={() => onPlaceBid("DOUBLE")} 
              className="bg-gradient-to-br from-yellow-600 to-red-600 text-white py-6 font-extrabold text-lg tracking-widest hover:brightness-125 transition-all duration-300 uppercase active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.2)] flex items-center justify-center gap-2"
            >
              DOUBLE 🔥
            </button>
          </div>
          <p className="text-[10px] text-outline uppercase tracking-widest leading-relaxed pt-6">
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