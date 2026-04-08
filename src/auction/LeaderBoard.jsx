export default function Leaderboard() {
  return (
    <section className="lg:col-span-3 flex flex-col gap-4 overflow-hidden h-full">
      <h3 className="text-label-md uppercase tracking-[0.2em] font-bold text-on-surface-variant px-2">Bid History</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-1">
        {/* Bid Entry 1 (Active) */}
        <div className="p-4 bg-primary/10 border-l-2 border-primary flex items-center justify-between group transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center font-bold text-primary">A9</div>
            <div>
              <p className="text-sm font-bold text-on-surface">Anonymous Bidder</p>
              <p className="text-[10px] text-outline font-mono">14:51:22</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold">$48,405,000</p>
            <p className="text-[9px] uppercase tracking-tighter text-green-500">Leading</p>
          </div>
        </div>
        {/* Bid Entry 2 */}
        <div className="p-4 hover:bg-surface-container-low flex items-center justify-between transition-all opacity-80">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center font-bold text-on-surface">SK</div>
            <div>
              <p className="text-sm font-bold text-on-surface">S. Kajiwara</p>
              <p className="text-[10px] text-outline font-mono">14:50:45</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-on-surface">$48,355,000</p>
            <p className="text-[9px] uppercase tracking-tighter text-outline">Outbid</p>
          </div>
        </div>
        {/* Bid Entry 3 */}
        <div className="p-4 hover:bg-surface-container-low flex items-center justify-between transition-all opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center font-bold text-on-surface">A9</div>
            <div>
              <p className="text-sm font-bold text-on-surface">Anonymous Bidder</p>
              <p className="text-[10px] text-outline font-mono">14:48:12</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-on-surface">$48,305,000</p>
          </div>
        </div>
        {/* Bid Entry 4 */}
        <div className="p-4 hover:bg-surface-container-low flex items-center justify-between transition-all opacity-40">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center font-bold text-on-surface">RM</div>
            <div>
              <p className="text-sm font-bold text-on-surface">R. Manton</p>
              <p className="text-[10px] text-outline font-mono">14:42:01</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-on-surface">$48,255,000</p>
          </div>
        </div>
        {/* Bid Entry 5 */}
        <div className="p-4 hover:bg-surface-container-low flex items-center justify-between transition-all opacity-20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center font-bold text-on-surface">A9</div>
            <div>
              <p className="text-sm font-bold text-on-surface">Anonymous Bidder</p>
              <p className="text-[10px] text-outline font-mono">14:39:55</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-on-surface">$48,205,000</p>
          </div>
        </div>
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