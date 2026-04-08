import { motion } from "framer-motion";

export default function AuctionItem({ timeLeft, itemDetails }) {

  const fallbackImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuCu7QXoNpqF8eOJAZ8lHep8YdL5eKF-8VhJSUQARzJbx-ERofoSNdGFyx8jBYtUjjwanalyFaoe7L-lQvxBiQhxvWbEzgvVRbO7V-B4_TEkx9OeLu7crTX5pDPjA29YNh6-9NFIbkfJITHwUe4phu-vJLz8v-4TD16MEA-_fTDE76ccC3jEfvEnbfP4gD0zZK-p8ESZi46iUbZnzUbt-ij13AD9381AlQv4UoEezQ-6stTNdYRTq4UAUDzKeQsvXh-w673Icg2Y4c0";

  const {
    title = "1962 Ferrari 250 GTO Berlintetta",
    description = "Delivered new to Maranello Concessionaires, UK. One of only 36 produced.",
    imagePreview = fallbackImg,
    imagePresent = false,
    category = "Car",
    condition = "Antique",
    yearsUsed = "N/A"
  } = itemDetails || {};

  // Format time HH:MM:SS:MS (mocked for simplicity to HH:MM:SS:00)
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}:00`;
  };

  const isCritical = timeLeft < 5;

  return (
    <section className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-hide h-full">
      <div className="relative aspect-video w-full bg-surface-container-low group overflow-hidden">
        <img alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={imagePresent ? imagePreview : fallbackImg}/>
        <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 text-xs font-bold tracking-widest uppercase">
          Lot No. 01
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h1 className="text-4xl font-bold leading-tight text-on-surface">{title}</h1>
          <span className="text-secondary font-semibold text-sm flex items-center gap-1 mb-1">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Verified
          </span>
        </div>
        <div className={`flex gap-4 items-center p-4 bg-surface-container-lowest border-l-4 transition-colors ${isCritical ? 'border-red-500' : 'border-primary'}`}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-outline">Closing In</p>
            <motion.p 
              className={`text-2xl font-mono font-bold tracking-tighter ${isCritical ? 'text-red-500' : 'text-primary'}`}
              animate={isCritical ? { x: [-3, 3, -3, 3, 0], scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: isCritical ? Infinity : 0, duration: 0.3 }}
            >
              {formatTime(timeLeft)}
            </motion.p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-label-md uppercase tracking-widest text-primary mb-3">Provenance & History</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="text-outline font-mono text-sm pt-1">Overview</div>
                <div className="text-sm border-l border-outline-variant pl-4 text-on-surface-variant max-w-sm whitespace-pre-wrap">{description}</div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-surface-container-high border border-outline-variant/20 rounded-xl">
            <h3 className="text-label-md uppercase tracking-widest text-on-surface-variant mb-4">Specifications</h3>
            <dl className="grid grid-cols-2 gap-y-4 gap-x-4 text-xs">
              <div className="border-b border-outline-variant/30 pb-2">
                <dt className="text-outline uppercase tracking-wider mb-1">Asset Class</dt>
                <dd className="font-bold text-on-surface">{category}</dd>
              </div>
              <div className="border-b border-outline-variant/30 pb-2">
                <dt className="text-outline uppercase tracking-wider mb-1">Condition Rating</dt>
                <dd className="font-bold text-on-surface">{condition}</dd>
              </div>
              <div className="border-b border-outline-variant/30 pb-2">
                <dt className="text-outline uppercase tracking-wider mb-1">Years Utilized</dt>
                <dd className="font-bold text-on-surface">{yearsUsed}</dd>
              </div>
              <div className="border-b border-outline-variant/30 pb-2">
                <dt className="text-outline uppercase tracking-wider mb-1">Authentication</dt>
                <dd className="font-bold text-on-surface text-green-500">Verified ✅</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}