import { Link } from "react-router-dom";

export default function RoleSelector() {
  return (
    <section className="py-32 px-12 bg-surface">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-800">
        {/* The Collector */}
        <div className="group relative bg-surface p-16 overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-9xl">payments</span>
          </div>
          <h3 className="text-4xl mb-6">The Collector</h3>
          <p className="text-stone-400 text-lg leading-relaxed mb-12 max-w-md">Access the world&apos;s most prestigious private collections. Our verification ledger ensures provenance for every artifact you acquire.</p>
          <Link className="inline-flex items-center gap-4 text-primary font-label uppercase tracking-widest group" to="/auction">
            Begin Bidding 
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </Link>
        </div>
        {/* The Curator */}
        <div className="group relative bg-surface p-16 overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-9xl">museum</span>
          </div>
          <h3 className="text-4xl mb-6">The Curator</h3>
          <p className="text-stone-400 text-lg leading-relaxed mb-12 max-w-md">Position your assets before a global audience of high-net-worth investors. Professional appraisal and white-glove logistics included.</p>
          <Link className="inline-flex items-center gap-4 text-primary font-label uppercase tracking-widest group" to="/sell">
            List an Asset 
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}