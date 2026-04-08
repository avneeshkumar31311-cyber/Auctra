import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RoleSelector from "../components/RoleSelector";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import SellerDashboard from "./SellerDashboard";

export default function Landing({ defaultShowSeller = false }) {
  const [showAuth, setShowAuth] = useState(false);
  const [showSeller, setShowSeller] = useState(defaultShowSeller);
  const navigate = useNavigate();

  useEffect(() => {
    setShowSeller(defaultShowSeller);
  }, [defaultShowSeller]);

  const handleCloseSeller = () => {
    setShowSeller(false);
    navigate("/"); // Reset URL without modal
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar onAuthClick={() => setShowAuth(true)} />
      <Hero />
      <RoleSelector />
      <ProductGrid />

      {/* Success/Auth Trigger Banner */}
      <section className="py-24 px-12 bg-primary">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-on-primary">
            <h2 className="text-4xl md:text-5xl mb-4 text-on-primary">Secure your place in history.</h2>
            <p className="font-label text-sm uppercase tracking-widest opacity-80">Private memberships available by application only.</p>
          </div>
          <button 
            onClick={() => setShowAuth(true)}
            className="bg-on-primary text-primary px-12 py-6 text-lg font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
          >
            Join The Archive
          </button>
        </div>
      </section>

      <Footer />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <SellerDashboard isOpen={showSeller} onClose={handleCloseSeller} />
    </div>
  );
}