import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuction } from "../context/AuctionContext";
import { motion, AnimatePresence } from "framer-motion";

export default function AuctionLobby() {
  const { auction, socket, startAuction } = useAuction();
  const navigate = useNavigate();
  const { auctionId } = useParams();

  // 1. Instantly redirect if status is LIVE
  useEffect(() => {
    if (auction?.status === 'LIVE' || auction?.status === 'live') {
      navigate(`/auction/${auctionId}`);
    }
  }, [auction?.status, navigate, auctionId]);

  // Establish Authenticated Socket Connection on Entry
  useEffect(() => {
    if (auctionId) {
       // We grab the token from localStorage that InviteGateway stored.
       // The host might not have a token, but the socket backend is tolerant of the "Auctra Host" edge case.
       let user = null;
       try { user = JSON.parse(localStorage.getItem('auctra_user')); } catch (e) {}
       const userId = user && user.name ? user.name : "Guest";
       const token = localStorage.getItem(`auctra_token_${auctionId}`);
       
       socket.emit('join_auction_room', { auctionId, userId, token });
    }
  }, [auctionId, socket]);

  if (!auction?.item) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-500 animate-pulse font-sans tracking-widest uppercase text-xs">
          Loading Lobby State...
        </div>
      </div>
    );
  }

  const acceptedList = auction?.acceptedBidders || [];
  const count = acceptedList.length;
  const isReady = count >= 2;

  // Render dummy avatars for accepted bidders
  // Fallback map: A list of default gradient colors
  const gradients = [
    "from-blue-500 to-purple-600",
    "from-emerald-500 to-teal-700",
    "from-rose-500 to-red-600",
    "from-amber-400 to-orange-600",
    "from-indigo-500 to-blue-700",
    "from-yellow-400 to-yellow-600" // For "You"
  ];

  return (
    <div className="min-h-screen bg-black pt-32 px-6 flex flex-col items-center">
      
      {/* Lobby Header */}
      <div className="max-w-4xl w-full text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <p className="font-label text-xs uppercase tracking-[0.4em] text-yellow-600 font-bold mb-4 drop-shadow-md">
          VIP Waiting Room
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Auction Lobby</h1>
        <p className="text-zinc-400 font-sans text-lg max-w-2xl mx-auto mb-6">
          Host: <span className="text-white italic">{auction.seller}</span>
        </p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Item Preview */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-md shadow-2xl animate-in zoom-in-95 duration-1000">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden relative mb-8 ring-1 ring-white/10">
            {auction.item.imagePresent ? (
               <div className="w-full h-full bg-zinc-800 flex items-center justify-center relative">
                 <img src={auction.item.imagePreview || "https://images.unsplash.com/photo-1549643194-e03bf4202353?ixlib=rb-4.0.3"} alt="Uploaded Asset" className="w-full h-full object-cover opacity-80" />
               </div>
            ) : (
               <img 
                 src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3" 
                 alt="Fallback Item" 
                 className="w-full h-full object-cover opacity-80"
               />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-label text-[10px] uppercase tracking-widest text-yellow-500 mb-1">Lot 01</p>
              <h2 className="text-3xl font-serif text-white drop-shadow-lg">{auction.item.title || "Unknown Asset"}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 p-6 bg-black/50 rounded-2xl border border-zinc-800/50">
             <div>
               <p className="text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-1">Starting Bid</p>
               <p className="text-xl font-sans text-yellow-500 font-light">
                 {auction?.item?.suggestedBasePrice?.amount ? `₹${auction.item.suggestedBasePrice.amount.toLocaleString('en-IN')}` : `₹${parseFloat(auction?.item?.marketValue || 0).toLocaleString('en-IN')}`}
               </p>
             </div>
             <div>
               <p className="text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-1">Condition</p>
               <p className="text-xl font-sans text-white">{auction.item.condition || "Unknown"}</p>
             </div>
          </div>
        </div>

        {/* Right: Participant Status */}
        <div className="flex flex-col h-full justify-between">
          
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif text-white">Accepted Bidders</h3>
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-700 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isReady ? 'bg-emerald-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                <span className="font-sans text-xs tracking-widest uppercase text-zinc-300 font-bold">
                  {count} {count === 1 ? 'Joined' : 'Joined'}
                </span>
              </div>
            </div>

            {/* Bidders Grid */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 min-h-[300px] relative overflow-hidden">
               {/* Background grid pattern */}
               <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

               {count === 0 && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 animate-pulse z-10">
                   <span className="material-symbols-outlined text-4xl mb-4 opacity-50">hourglass_top</span>
                   <p className="font-sans text-sm uppercase tracking-widest font-bold">Waiting for RSVPs...</p>
                 </div>
               )}

               <div className="flex flex-wrap gap-4 relative z-10">
                 <AnimatePresence>
                   {acceptedList.map((bidder, i) => (
                     <motion.div
                       key={bidder}
                       initial={{ opacity: 0, scale: 0.5, y: 20 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
                       className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 flex items-center gap-3 w-[calc(50%-0.5rem)] shadow-lg"
                     >
                       <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center shadow-inner`}>
                         <span className="text-white font-serif text-lg leading-none">{bidder ? bidder.charAt(0) : '?'}</span>
                       </div>
                       <div className="flex-1 overflow-hidden">
                         <p className="text-white text-sm font-bold truncate">{bidder || "Unknown"}</p>
                         <p className="text-emerald-500 text-[10px] font-sans uppercase tracking-widest">Ready</p>
                       </div>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
            </div>
          </div>

          <div className="mt-12 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-zinc-400 mb-1">System Status</p>
                {isReady ? (
                  <p className="text-white font-serif text-xl">Quorum reached. Awaiting schedule.</p>
                ) : (
                  <p className="text-yellow-500 font-serif text-xl animate-pulse">Minimum 2 participants required...</p>
                )}
              </div>
              {auction?.seller === "You" || auction?.seller === "Auctra Host" || (auction?.seller && localStorage.getItem('auctra_user') && JSON.parse(localStorage.getItem('auctra_user')).name === auction.seller) ? (
                  <button
                    onClick={startAuction}
                    disabled={!isReady}
                    className={`px-10 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-sm transition-all duration-500 flex items-center gap-3
                      ${isReady 
                        ? 'bg-yellow-600 text-black hover:bg-yellow-500 hover:scale-105 shadow-[0_0_40px_rgba(234,179,8,0.4)] cursor-pointer' 
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                      }`}
                  >
                    {isReady ? (
                      <>
                        <span className="material-symbols-outlined text-black animate-pulse">play_circle</span>
                        Start Live Auction
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-zinc-500">lock</span>
                        Locked
                      </>
                    )}
                  </button>
              ) : (
                <div className="font-sans text-xs uppercase tracking-[0.2em] text-yellow-500 font-bold flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                  Awaiting Host...
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
