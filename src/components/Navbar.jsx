import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuction } from "../context/AuctionContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onAuthClick }) {
  const [user, setUser] = useState(null);
  const { notifications, acceptInvite, rejectInvite } = useAuction();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-12 md:px-24 py-8 bg-black/80 backdrop-blur-xl border-b border-primary/20 z-50">
      <div className="font-serif text-3xl md:text-4xl font-bold text-primary uppercase tracking-[0.2em] drop-shadow-md">
        Auctra
      </div>

      <div className="hidden lg:flex items-center gap-14">
        <Link to="/" className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-primary border-b-2 border-primary pb-2 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300">
          Auctions
        </Link>
        <a className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-primary transition-colors duration-300" href="#">Collectibles</a>
        <Link className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-primary transition-colors duration-300" to="/sell">Sell</Link>
        <a className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-primary transition-colors duration-300" href="#">Private Sales</a>
      </div>

      <div className="flex items-center gap-8">
        {/* Notification Bell */}
        {user && (
          <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
            <span className={`material-symbols-outlined text-3xl transition-colors hover:text-primary ${notifications.length > 0 ? "text-primary animate-pulse" : "text-stone-400"}`}>
              notifications
            </span>
            {notifications.length > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center font-bold text-white border-2 border-black">
                {notifications.length}
              </div>
            )}
          </div>
        )}

        {/* Profile Dropdown */}
        {user ? (
          <div className="relative">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
              <div className="w-14 h-14 rounded-full bg-surface-container border border-primary flex items-center justify-center text-primary overflow-hidden transition-colors hover:bg-primary/20 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                 {user.image ? (
                   <img src={user.image} className="w-full h-full object-cover" alt="Profile" />
                 ) : (
                   <span className="material-symbols-outlined text-3xl">person</span>
                 )}
              </div>
            </div>
            
            {/* Rich Profile Dropdown Menu */}
            <AnimatePresence>
              {showProfile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-20 right-0 w-80 bg-stone-950 border border-stone-800 shadow-2xl z-50 p-6 flex flex-col gap-6"
                >
                  <div className="flex justify-between items-start border-b border-stone-800 pb-4">
                    <div>
                      <h3 className="font-bold text-lg text-white">{user.name || "User"}</h3>
                      <p className="text-xs text-stone-400 uppercase tracking-widest">{user.country || "Global Region"}</p>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 px-3 py-1 text-[10px] text-primary uppercase font-bold tracking-widest rounded-sm">
                      {user.role || "Bidder"}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-stone-900 p-4 border border-stone-800 text-center space-y-1">
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest">Active Bids</p>
                      <p className="text-xl font-bold text-primary">12</p>
                    </div>
                    <div className="bg-stone-900 p-4 border border-stone-800 text-center space-y-1">
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest">Auctions Won</p>
                      <p className="text-xl font-bold text-primary">3</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-950/30 text-red-500 font-bold text-xs uppercase tracking-widest border border-red-900/50 hover:bg-red-900/50 transition-colors"
                  >
                    Disconnect Profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button 
            onClick={onAuthClick} 
            className="bg-primary text-on-primary px-10 py-4 text-sm font-bold uppercase tracking-[0.25em] hover:bg-primary-fixed-dim transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Global Notifications Slider */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-full md:w-96 h-screen bg-stone-950 border-l border-stone-800 z-[100] p-8 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-stone-800 pb-6 mb-6">
              <h2 className="text-xl font-serif text-white uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inbox</span> Invites
              </h2>
              <span className="material-symbols-outlined cursor-pointer hover:text-white" onClick={() => setShowNotifications(false)}>close</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {notifications.length === 0 ? (
                <p className="text-stone-500 text-sm italic py-12 text-center uppercase tracking-widest">No active auction invites</p>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className="bg-stone-900 border border-stone-800 p-6 space-y-4 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                    <div>
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-1">Host: {n.seller}</p>
                      <h4 className="text-md font-bold text-white break-words">{n.itemName}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4">
                       <button onClick={() => { acceptInvite(n.id); setShowNotifications(false); }} className="bg-primary/10 text-primary border border-primary/30 py-2 hover:bg-primary hover:text-black transition-colors uppercase font-bold text-[10px] tracking-widest">Accept</button>
                       <button onClick={() => { rejectInvite(n.id); setShowNotifications(false); }} className="bg-stone-800 text-stone-400 py-2 hover:bg-red-900 hover:text-red-300 transition-colors uppercase font-bold text-[10px] tracking-widest">Decline</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}