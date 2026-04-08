import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ onAuthClick }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("auctra_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        // ignore parsing errors
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auctra_user");
    setUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-12 py-6 bg-stone-950/70 backdrop-blur-md z-50">
      <div className="font-serif text-2xl font-bold text-yellow-600 dark:text-yellow-500 uppercase tracking-widest">
        Auctra
      </div>

      <div className="hidden md:flex items-center gap-10">
        <Link to="/" className="font-serif text-lg tracking-tight text-yellow-500 border-b-2 border-yellow-500 pb-1 hover:text-yellow-400 transition-colors duration-300">
          Auctions
        </Link>
        <a className="font-serif text-lg tracking-tight text-stone-400 hover:text-yellow-400 transition-colors duration-300" href="#">Collectibles</a>
        <Link className="font-serif text-lg tracking-tight text-stone-400 hover:text-yellow-400 transition-colors duration-300" to="/sell">Sell</Link>
        <a className="font-serif text-lg tracking-tight text-stone-400 hover:text-yellow-400 transition-colors duration-300" href="#">Private Sales</a>
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4 group relative cursor-pointer" onClick={handleLogout}>
            <div className="w-10 h-10 rounded-full bg-surface-container border border-primary flex items-center justify-center text-primary overflow-hidden transition-colors hover:bg-primary/10">
               {user.image ? (
                 <img src={user.image} className="w-full h-full object-cover" alt="Profile" />
               ) : (
                 <span className="material-symbols-outlined text-2xl">person</span>
               )}
            </div>
            {/* Tooltip */}
            <div className="absolute top-14 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 border border-stone-700 px-4 py-2 rounded text-xs text-stone-300 whitespace-nowrap shadow-2xl pointer-events-none uppercase tracking-widest font-bold">
               {user.name || "User"} • Sign Out
            </div>
          </div>
        ) : (
          <button 
            onClick={onAuthClick} 
            className="bg-primary text-on-primary px-8 py-2.5 font-label font-bold uppercase tracking-widest hover:bg-primary-fixed-dim transition-all duration-300 shadow-lg hover:shadow-primary/20"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}