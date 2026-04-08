import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center pt-24 px-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img alt="hero background" className="w-full h-full object-cover opacity-40" data-alt="dramatic wide shot of a luxury auction house interior with marble pillars, gold detailing, and spotlighting on a centerpiece artifact" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt1TlpqLH6sCAisIbi-KULbCoJOGjdpYdODXhd4PLuCMPg14eecLM7qxZ-rg9BJBdOAK1N9b8q0aKUl3T0pI6qcHt2UWFZ5OhFoIKFU3xUtnrBFZ1n7Se6KDsEzgyQDxEXtRKcthwUG3pwmQCqkD-vz8EEm_KVzTwzLRhdeaPtHyLr2v0XRauTAJQAE1qm9XzfgFh6Q6-KGCyGUStS0fitIOkXh1DJLB60pEerTEfH9D3YGJWCPP8dZiPF961xv2qnipLujGCQOa0"/>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-5xl">
        <span className="font-label text-sm uppercase tracking-[0.3em] text-primary mb-6 block">ESTABLISHED MCMXCVII</span>
        <h1 className="text-7xl md:text-9xl leading-[0.9] mb-12">
          Elite Auctions.<br/>
          <span className="italic font-normal">Real-Time Bidding.</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          <Link to="/auction" className="bg-primary text-on-primary px-10 py-5 text-lg font-bold uppercase tracking-widest hover:bg-primary-fixed-dim transition-all duration-300 inline-block text-center flex items-center justify-center">Enter Auction</Link>
          <Link to="/sell" className="border border-outline-variant/30 text-on-surface px-10 py-5 text-lg font-bold uppercase tracking-widest hover:bg-surface-container transition-all duration-300 inline-block text-center flex items-center justify-center">Start Selling</Link>
        </div>
      </div>
      <div className="absolute bottom-12 right-12 hidden lg:block text-right">
        <p className="font-label text-xs text-stone-500 uppercase tracking-widest mb-2">NOW FEATURED</p>
        <p className="font-serif text-2xl">Lot 402: 1964 GT Prototype</p>
        <p className="font-label text-primary text-xl">$4,200,000</p>
      </div>
    </header>
  );
}