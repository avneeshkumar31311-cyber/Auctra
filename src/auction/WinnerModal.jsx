export default function WinnerModal({ show, winner, amount, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-12">
      <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="w-32 h-32 flex items-center justify-center bg-primary text-on-primary">
            <span className="material-symbols-outlined text-7xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-label-md uppercase tracking-[0.5em] text-primary">Auction Result</h2>
          <h1 className="text-8xl font-bold tracking-tighter uppercase italic text-on-surface">SOLD</h1>
        </div>
        <div className="py-12 border-y border-primary/20 space-y-6">
          <p className="text-2xl font-serif text-on-surface">To <span className="text-primary underline decoration-2 underline-offset-8">User {winner}</span></p>
          <p className="text-6xl font-bold tracking-tighter text-on-surface">${amount} USD</p>
        </div>
        <button 
          onClick={onClose}
          className="bg-primary text-on-primary px-12 py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary-fixed-dim transition-all"
        >
          Close Archive
        </button>
      </div>
    </div>
  );
}