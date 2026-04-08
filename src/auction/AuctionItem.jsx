import { useEffect, useState } from "react";

export default function AuctionItem({ onEnd }) {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && onEnd) onEnd();
  }, [timeLeft, onEnd]);

  // Format time HH:MM:SS:MS (mocked for simplicity to HH:MM:SS:00)
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}:08`;
  };

  return (
    <section className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-hide h-full">
      <div className="relative aspect-video w-full bg-surface-container-low group overflow-hidden">
        <img alt="1962 Ferrari 250 GTO" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Close up of a vintage red 1960s Ferrari race car" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu7QXoNpqF8eOJAZ8lHep8YdL5eKF-8VhJSUQARzJbx-ERofoSNdGFyx8jBYtUjjwanalyFaoe7L-lQvxBiQhxvWbEzgvVRbO7V-B4_TEkx9OeLu7crTX5pDPjA29YNh6-9NFIbkfJITHwUe4phu-vJLz8v-4TD16MEA-_fTDE76ccC3jEfvEnbfP4gD0zZK-p8ESZi46iUbZnzUbt-ij13AD9381AlQv4UoEezQ-6stTNdYRTq4UAUDzKeQsvXh-w673Icg2Y4c0"/>
        <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 text-xs font-bold tracking-widest uppercase">
          Lot No. 402
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h1 className="text-4xl font-bold leading-tight text-on-surface">1962 Ferrari 250 GTO Berlintetta</h1>
          <span className="text-secondary font-semibold text-sm flex items-center gap-1 mb-1">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Verified
          </span>
        </div>
        <div className="flex gap-4 items-center p-4 bg-surface-container-lowest border-l-4 border-primary">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-outline">Closing In</p>
            <p className="text-2xl font-mono font-bold tracking-tighter text-primary">{formatTime(timeLeft)}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-label-md uppercase tracking-widest text-primary mb-3">Provenance & History</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="text-outline font-mono text-sm pt-1">1962</div>
                <div className="text-sm border-l border-outline-variant pl-4 text-on-surface-variant">Delivered new to Maranello Concessionaires, UK. One of only 36 produced.</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-outline font-mono text-sm pt-1">1964</div>
                <div className="text-sm border-l border-outline-variant pl-4 text-on-surface-variant">Winner of the Tour de France Automobile. Piloted by Lucien Bianchi.</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-outline font-mono text-sm pt-1">2012</div>
                <div className="text-sm border-l border-outline-variant pl-4 text-on-surface-variant">Comprehensive restoration by Ferrari Classiche Department.</div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-surface-container-high">
            <h3 className="text-label-md uppercase tracking-widest text-on-surface-variant mb-2">Specifications</h3>
            <dl className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
              <div className="border-b border-outline-variant/30 pb-2">
                <dt className="text-outline uppercase tracking-wider mb-1">Chassis</dt>
                <dd className="font-bold text-on-surface">3413GT</dd>
              </div>
              <div className="border-b border-outline-variant/30 pb-2">
                <dt className="text-outline uppercase tracking-wider mb-1">Engine</dt>
                <dd className="font-bold text-on-surface">3.0L V12</dd>
              </div>
              <div className="border-b border-outline-variant/30 pb-2">
                <dt className="text-outline uppercase tracking-wider mb-1">Transmission</dt>
                <dd className="font-bold text-on-surface">5-Speed Manual</dd>
              </div>
              <div className="border-b border-outline-variant/30 pb-2">
                <dt className="text-outline uppercase tracking-wider mb-1">Color</dt>
                <dd className="font-bold text-on-surface">Rosso Corsa</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}