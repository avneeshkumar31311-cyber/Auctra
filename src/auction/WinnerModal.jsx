import { useEffect } from "react";
import { motion } from "framer-motion";

export default function WinnerModal({ show, winner, amount, onClose }) {
  useEffect(() => {
    if (show) {
      // Load confetti via CDN safely since npm install wasn't available
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
      script.onload = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          window.confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FBBF24', '#D97706', '#92400E', '#FFFFFF']
          });
          window.confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FBBF24', '#D97706', '#92400E', '#FFFFFF']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      };
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-12">
      <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-700 delay-150">
        <div className="flex justify-center">
          <motion.div 
            initial={{ rotate: -90, y: -100, scale: 1.5 }}
            animate={{ rotate: 0, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.3 }}
            className="w-32 h-32 flex items-center justify-center bg-primary text-on-primary rounded-full shadow-[0_0_50px_rgba(234,179,8,0.5)] origin-bottom-right"
          >
            <span className="material-symbols-outlined text-7xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
          </motion.div>
        </div>
        <div className="space-y-4">
          <h2 className="text-label-md uppercase tracking-[0.5em] text-primary">Auction Result</h2>
          <h1 className="text-8xl font-bold tracking-tighter uppercase italic text-on-surface">SOLD</h1>
        </div>
        <div className="py-12 border-y border-primary/20 space-y-6">
          <p className="text-2xl font-serif text-on-surface">To <span className="text-primary underline decoration-2 underline-offset-8">{winner}</span></p>
          <p className="text-6xl font-bold tracking-tighter text-on-surface">{amount}</p>
        </div>
        <button 
          onClick={onClose}
          className="bg-primary text-on-primary px-12 py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary-fixed-dim transition-all active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
        >
          Close Archive
        </button>
      </div>
    </div>
  );
}