import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuctionItem from "../auction/AuctionItem";
import BidPanel from "../auction/BidPanel";
import Leaderboard from "../auction/LeaderBoard";
import WinnerModal from "../auction/WinnerModal";
import AuthModal from "../components/AuthModal";
import { useAuction } from "../context/AuctionContext";

export default function Auction() {
  const { auction, socket } = useAuction();
  const navigate = useNavigate();
  const { auctionId } = useParams();

  const [status, setStatus] = useState("LIVE"); // 'LIVE' | 'ENDED'
  const [showAuth, setShowAuth] = useState(false);
  
  // Real-time backend states
  const [timeLeft, setTimeLeft] = useState(15);
  const [currentBid, setCurrentBid] = useState(48400000); 
  const [leadingBidder, setLeadingBidder] = useState("Awaiting Bids...");
  const [bidHistory, setBidHistory] = useState([]); // Will now be driven by ZSET leaderboard!
  const [winnerData, setWinnerData] = useState(null);

  useEffect(() => {
    if (auction.status !== "live" && auction.status !== "ended") {
       navigate("/lobby");
    }
  }, [auction.status, navigate]);
  
  // 1. Initial State Sync
  useEffect(() => {
    if (auction.item) {
       const initialPrice = auction.item.suggestedBasePrice 
          ? auction.item.suggestedBasePrice.amount 
          : parseFloat(auction.item.marketValue) || 48400000;
       setCurrentBid((prev) => prev === 48400000 ? initialPrice : prev);
    }
  }, [auction.item]);

  // 2. WebSocket Engine (SSOT)
  useEffect(() => {
    if (status !== "LIVE" || !socket || !auctionId) return;
    
    // Check if we have a robust token from entry
    const token = localStorage.getItem(`auctra_token_${auctionId}`);
    let user = { name: "Guest" };
    try {
       const parsed = JSON.parse(localStorage.getItem('auctra_user'));
       if (parsed) user = parsed;
    } catch(e) {}

    socket.emit('join_auction_room', { auctionId, userId: user.name, token });

    const handleStateUpdate = (state) => {
      setCurrentBid(state.highestBid);
      setLeadingBidder(state.leader);

      // Reformat the ZSET leaderboard array into the UI format
      if (state.leaderboard) {
        const historyFormat = state.leaderboard.map(leader => ({
          id: leader.bidder, // uuid or name
          bidder: leader.bidder,
          initial: leader.bidder.substring(0, 2).toUpperCase(),
          time: new Date().toLocaleTimeString('en-US'),
          amount: leader.amount,
          leading: leader.rank === 1
        }));
        setBidHistory(historyFormat);
      }
    };

    const handleHammerDrop = (payload) => {
      console.log("💥 HAMMER DROP EVENT RECEIVED FROM NODE ENGINE!", payload);
      setWinnerData({
        name: payload.winnerId || "No Bids",
        amount: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(payload.finalAmount || 0),
      });
      setStatus("ENDED");
    };

    const handleAuctionStarted = (payload) => {
      console.log("⏱️ SERVER TIMER STARTED:", payload.durationMs);
      setTimeLeft(payload.durationMs / 1000);
    };

    socket.on('auction_state_update', handleStateUpdate);
    socket.on('hammer_drop', handleHammerDrop);
    socket.on('auction_started', handleAuctionStarted);

    return () => {
      socket.off('auction_state_update', handleStateUpdate);
      socket.off('hammer_drop', handleHammerDrop);
      socket.off('auction_started', handleAuctionStarted);
    }
  }, [status, socket]);


  // 3. Local UI Timer (Since the server only dictates the hammer drop)
  useEffect(() => {
    if (status !== "LIVE" || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [status, timeLeft]);


  // 4. WebSocket Load-Testing Bot Simulator (REMOVED based on User Feedback!)
  /*
  useEffect(() => {
    if (status !== "LIVE" || timeLeft <= 0 || !socket) return;
    
    let active = true;
    const fireRandomBid = () => {
      // Dummy bot script purged! Room is authentically clean.
    };
    return () => { active = false; };
  }, [status, timeLeft, currentBid, socket]);
  */

  const handlePlaceBid = (amountToAdd) => {
    let user = { name: "Guest" };
    try {
       const parsed = JSON.parse(localStorage.getItem('auctra_user'));
       if (parsed) user = parsed;
    } catch(e) {}
    
    // We already passed the exact integer from BidPanel (which calculated 10%, 20% etc)!
    const newBid = amountToAdd === "DOUBLE" ? currentBid * 2 : currentBid + amountToAdd;
    
    // Convert to a raw network emit. NO UI override! UI will update if Node accepts it securely.
    socket.emit('place_bid', {
      auctionId,
      userId: user.name,
      amount: newBid,
      idempotencyKey: Math.random().toString(36).substring(7)
    });
  };

  if (auction.status !== "live" && auction.status !== "ended") return null;

  const renderLive = () => {
    let user = {};
    try {
       const parsed = JSON.parse(localStorage.getItem('auctra_user'));
       if (parsed) user = parsed;
    } catch(e) {}
    
    return (
      <main className="pt-32 pb-12 px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 h-full min-h-[calc(100vh-90px)] overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-8">
        
        {/* User Role Identity Badge */}
        <div className="absolute top-28 right-12 z-20 flex items-center gap-3 bg-surface-container-high border border-outline-variant/20 px-6 py-3 rounded-full shadow-2xl">
           <div className={`w-3 h-3 rounded-full animate-pulse ${user.role === 'seller' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
           <span className="text-xs font-bold uppercase tracking-widest text-on-surface">
             {user.role === 'seller' ? 'Hosting Event' : 'Active Bidder'} ({user.name || "Guest"})
           </span>
        </div>

        <AuctionItem timeLeft={timeLeft} itemDetails={auction.item} />
        <BidPanel 
           currentBid={currentBid} 
           leadingBidder={leadingBidder} 
           onPlaceBid={handlePlaceBid} 
           currentUser={user.name}
        /> 
        <Leaderboard bidHistory={bidHistory} />
      </main>
    );
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative overflow-hidden">
      {/* Cinematic animated background for Live view */}
      {status === 'LIVE' && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-background to-background pointer-events-none"></div>
      )}

      <Navbar onAuthClick={() => setShowAuth(true)} />

      {/* State Switcher */}
      <div className="flex-1 flex flex-col relative z-10 w-full">
         {status === "LIVE" && renderLive()}
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