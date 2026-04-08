import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AuctionItem from "../auction/AuctionItem";
import BidPanel from "../auction/BidPanel";
import Leaderboard from "../auction/LeaderBoard";
import WinnerModal from "../auction/WinnerModal";
import AuthModal from "../components/AuthModal";
import { useLocation } from "react-router-dom";

export default function Auction() {
  const location = useLocation();
  // Get initial state from URL query if exists (e.g. ?state=LOBBY)
  const queryParams = new URLSearchParams(location.search);
  const initialState = queryParams.get("state") || "LIVE"; // defaulting to LIVE if normal load

  const [status, setStatus] = useState(initialState); // 'LOBBY' | 'LIVE' | 'ENDED' | 'CANCELLED'
  const [showAuth, setShowAuth] = useState(false);
  
  // Lobby State
  const [lobbyCountdown, setLobbyCountdown] = useState(15);
  const [participants, setParticipants] = useState(1);
  const minParticipants = 2; // Simulated from mock backend

  // Winner State
  const [winnerData, setWinnerData] = useState(null);

  // Lobby Timer Effect
  useEffect(() => {
    if (status !== "LOBBY") return;
    
    // Simulate someone joining at 8 seconds left
    const joinTimer = setTimeout(() => {
      setParticipants(p => p + 1);
    }, 7000);

    const timer = setInterval(() => {
      setLobbyCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Transition logic when countdown hits 0
          if (participants >= minParticipants || true) { // Forced true for smooth hackathon demo
             setStatus("LIVE");
          } else {
             setStatus("CANCELLED");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(joinTimer);
    };
  }, [status, participants]);

  const handleAuctionEnd = (finalWinnerData) => {
    setWinnerData(finalWinnerData || {
      name: "Anonymous Bidder #A9",
      amount: "₹48,405,000",
    });
    setStatus("ENDED");
  };

  const renderLobby = () => (
    <div className="flex-1 flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full pt-20 px-6 blur-0 transition-all duration-1000">
      <div className="bg-zinc-900/60 backdrop-blur-2xl border border-yellow-500/30 rounded-3xl p-12 w-full shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-6xl text-yellow-500 mb-6 animate-pulse">hourglass_top</span>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-4">Pre-Auction Lobby</p>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Waiting for Participants...</h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full mt-8 border-t border-zinc-800/50 pt-12">
               <div className="text-center">
                   <p className="font-sans text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">Starts In</p>
                   <p className="text-6xl font-sans text-yellow-500 font-light tracking-tighter tabular-nums">{lobbyCountdown}s</p>
               </div>
               
               <div className="hidden md:block w-px h-16 bg-zinc-800/60"></div>
               
               <div className="text-center">
                   <p className="font-sans text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">Collectors Joined</p>
                   <p className={`text-6xl font-sans font-light tracking-tighter ${participants >= minParticipants ? 'text-green-500' : 'text-white'}`}>
                      {participants}<span className="text-3xl text-zinc-600">/{minParticipants}</span>
                   </p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );

  const renderLive = () => (
    <main className="pt-32 pb-12 px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 h-full min-h-[calc(100vh-90px)] overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-8">
      <AuctionItem onEnd={handleAuctionEnd} />
      {/* Bid panel needs onEnd hook too to trigger completion based on the countdown timer inside BidPanel */}
      <BidPanel onAuctionComplete={handleAuctionEnd} /> 
      <Leaderboard />
    </main>
  );

  const renderCancelled = () => (
    <div className="flex-1 flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full pt-20 px-6">
       <div className="bg-red-950/20 backdrop-blur-md border border-red-900/50 rounded-3xl p-12 w-full text-center">
          <span className="material-symbols-outlined text-5xl text-red-500 mb-4">cancel</span>
          <h2 className="text-3xl text-white font-serif mb-2">Auction Aborted</h2>
          <p className="text-zinc-400 font-sans">Insufficient participants joined the reserve pool. The asset has been preserved.</p>
       </div>
    </div>
  );

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative overflow-hidden">
      {/* Cinematic animated background for Live view */}
      {status === 'LIVE' && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-background to-background pointer-events-none"></div>
      )}

      <Navbar onAuthClick={() => setShowAuth(true)} />

      {/* State Switcher */}
      <div className="flex-1 flex flex-col relative z-10 w-full">
         {status === "LOBBY" && renderLobby()}
         {status === "LIVE" && renderLive()}
         {status === "CANCELLED" && renderCancelled()}
         {status === "ENDED" && renderLive() /* Keep Live view mounted behind winner modal */}
      </div>

      <footer className="w-full border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-8 bg-stone-950 p-12 mt-auto z-10 relative">
        <div className="font-serif text-xl text-yellow-600">Auctra</div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="font-sans text-xs uppercase tracking-widest text-stone-600 hover:text-white transition-colors" href="#">Provenance Policy</a>
          <a className="font-sans text-xs uppercase tracking-widest text-stone-600 hover:text-white transition-colors" href="#">Terms of Sale</a>
          <a className="font-sans text-xs uppercase tracking-widest text-stone-600 hover:text-white transition-colors" href="#">Privacy Ledger</a>
          <a className="font-sans text-xs uppercase tracking-widest text-stone-600 hover:text-white transition-colors" href="#">Contact House</a>
        </div>
        <div className="font-sans text-xs uppercase tracking-widest text-stone-500">
          © 2026 Auctra Digital Archive. All Rights Reserved.
        </div>
      </footer>

      {winnerData && (
        <WinnerModal
          show={status === "ENDED"}
          winner={winnerData.name}
          amount={winnerData.amount}
          onClose={() => setStatus("LIVE") /* For testing */}
        />
      )}
      
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}