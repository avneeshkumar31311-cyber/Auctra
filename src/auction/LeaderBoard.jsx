import { motion, AnimatePresence } from "framer-motion";

export default function Leaderboard({ bidHistory = [] }) {
  return (
    <section className="lg:col-span-3 flex flex-col gap-4 overflow-hidden h-full">
      <h3 className="text-label-md uppercase tracking-[0.2em] font-bold text-on-surface-variant px-2">Bid History</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-1 scrollbar-hide">
        <AnimatePresence>
          {bidHistory.map((bid, index) => {
            const isLeading = index === 0;
            const opacity = isLeading ? 1 : Math.max(0.2, 1 - index * 0.2);
            
            return (
              <motion.div
                key={bid.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: opacity, y: 0, scale: 1 }}
                layout
                className={`p-4 flex items-center justify-between transition-colors ${
                  isLeading 
                    ? "bg-primary/10 border-l-2 border-primary" 
                    : "hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center font-bold ${isLeading ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface'}`}>
                    {bid.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface truncate max-w-[120px]">{bid.bidder}</p>
                    <p className="text-[10px] text-outline font-mono">{bid.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${isLeading ? 'text-primary' : 'text-on-surface'}`}>
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(bid.amount)}
                  </p>
                  {isLeading ? (
                    <p className="text-[9px] uppercase tracking-tighter text-green-500">Leading</p>
                  ) : (
                    <p className="text-[9px] uppercase tracking-tighter text-outline">Outbid</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {/* House Activity */}
      <div className="mt-4 p-4 border-t border-outline-variant/20">
        <div className="flex gap-3">
          <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>info</span>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest leading-relaxed">
            The auctioneer has noted significant interest from the phone bank.
          </p>
        </div>
      </div>
    </section>
  );
}