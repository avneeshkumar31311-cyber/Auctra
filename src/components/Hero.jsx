import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center pt-32 px-12 md:px-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img alt="hero background" className="w-full h-full object-cover opacity-60" data-alt="dramatic wide shot of a luxury auction house interior with marble pillars, gold detailing, and spotlighting on a centerpiece artifact" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt1TlpqLH6sCAisIbi-KULbCoJOGjdpYdODXhd4PLuCMPg14eecLM7qxZ-rg9BJBdOAK1N9b8q0aKUl3T0pI6qcHt2UWFZ5OhFoIKFU3xUtnrBFZ1n7Se6KDsEzgyQDxEXtRKcthwUG3pwmQCqkD-vz8EEm_KVzTwzLRhdeaPtHyLr2v0XRauTAJQAE1qm9XzfgFh6Q6-KGCyGUStS0fitIOkXh1DJLB60pEerTEfH9D3YGJWCPP8dZiPF961xv2qnipLujGCQOa0"/>
        {/* Dynamic dark gradient overlay pushing from left to right to anchor the text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        {/* Bottom fade into the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl md:w-2/3">
        <span className="font-sans text-sm md:text-md uppercase tracking-[0.4em] text-primary mb-8 block font-bold drop-shadow-md">ESTABLISHED MCMXCVII</span>
        <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] mb-12 text-white drop-shadow-2xl">
          Elite <br/> Auctions.<br/>
          <span className="italic font-light text-stone-300">Live.</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <Link to="/auction" className="bg-primary text-on-primary px-12 py-6 text-xl font-bold uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all duration-300 text-center flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:scale-105">Enter Auction</Link>
          <Link to="/sell" className="border border-white/30 bg-black/30 backdrop-blur-sm text-white px-12 py-6 text-xl font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 text-center flex items-center justify-center hover:scale-105">Start Selling</Link>
        </div>
      </div>
      
      <div className="absolute bottom-16 right-16 hidden lg:flex flex-col items-end z-10 bg-black/40 backdrop-blur-md border border-primary/20 p-8 rounded-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
          <p className="font-sans text-xs text-error font-bold uppercase tracking-widest">NOW BIDDING</p>
        </div>
        <p className="font-serif text-3xl mb-1 text-white">Lot 402: 1964 GT Prototype</p>
        <p className="font-sans text-primary text-2xl font-bold tracking-tighter drop-shadow-md">₹4,20,00,000</p>
      </div>
    </header>
  );
}